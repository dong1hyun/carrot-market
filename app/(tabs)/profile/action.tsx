"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser(userId: number) {
    // User가 profile 페이지로 이동할 때 browser로부터 cookie를 받음
    // getSession function은 쿠키를 찾고
    // password를 이용해서  decrypt하고 ID를 돌려줌
    if (userId) {
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        if (user) return user;
    }
    notFound();
}

export const getMyProduct = async (userId: number) => {
    const product = await db.product.findMany({
        where: {
            user: {
                id: userId
            }
        }
    });
    return product;
}

export async function updateInfo(prev: any, formData: FormData) {
    console.log(formData);
    
}

export const logOut = async () => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}