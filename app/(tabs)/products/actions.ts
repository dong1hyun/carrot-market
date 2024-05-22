"use server"

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        orderBy: {
            created_at: "desc"
        },
        skip: 1,
        take: 1
    });

    return products;
}