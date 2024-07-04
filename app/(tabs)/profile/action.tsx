"use server"

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

export async function getUser(userId: number) {
    // User가 profile 페이지로 이동할 때 browser로부터 cookie를 받음
    // getSession function은 쿠키를 찾고
    // password를 이용해서  decrypt하고 ID를 돌려줌
    if (userId) {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                phone: true,
                avatar: true,
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
};

const userInfoSchema = z.object({
    username: z
        .string({
            invalid_type_error: "Username must be a string!",
            required_error: "Where is my username???",
        })
        .trim()
        .toLowerCase(),
    phone: z
        .string()
        .trim()
        .refine(validator.isMobilePhone, "Wrong phone format"),
    avatar: z.string()
});

export async function updateInfo(prev: any, formData: FormData) {
    console.log(formData);
    const session = await getSession();
    const data = {
        username: formData.get("username"),
        phone: formData.get("phone"),
        avatar: formData.get("avatar")
    };

    const password = formData.get("password");
    
    const result = await userInfoSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    }
    else {
        db.user.update({
            where: {
                id: session.id
            },
            data: {
                username: result.data.username,
                phone: result.data.phone,
                avatar: result.data.avatar
            }
        });
    }


}

export const logOut = async () => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}