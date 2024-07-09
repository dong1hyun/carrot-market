"use server"

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getInitialProducts = async () => {
    const products = await db.product.findMany({
        where: {
            user: {
                id: 3
            }
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export async function getMoreProducts(page: number) {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        skip: page * 1,
        take: 1,
        orderBy: {
            created_at: "desc"
        },
    });
    // console.log(products)
    return products;
}