import ListProduct from "@/app/components/list-product";
import ProductList from "@/app/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialProducts() {
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
        take: 1
    });
    return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

export default async function Products() {
    const initialProducts = await getInitialProducts();
    return (
        <div>
            <ProductList initialProduct={initialProducts} />
        </div>
    )
}