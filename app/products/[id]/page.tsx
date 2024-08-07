import { isProductOwner } from "@/lib/IsOwner";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon, getCachedProduct, getProduct } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/16/solid";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const product = await getProduct(id);
    if (!product) {
        return notFound();
    }
    const isOwner = await isProductOwner(product.userId);
    const deleteProduct = async () => {
        "use server"
        await db.product.delete({
            where: {
                id
            }
        });
        revalidateTag("home-products");
        redirect("/home");
    };
    return (
        <div>
            <div className="relative aspect-square">
                <Image fill src={product.photo} alt={product.title} className="object-cover" />
            </div>
            <div className="p-5 flex items-center
            gap-3 border-b border-neutral-600">
                <div className="size-10 rounded-full overflow-hidden">
                    {product.user.avatar ? <Image src={product.user.avatar} alt={product.user.username} width={40} height={40} /> : <UserIcon />}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5 mb-60">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
                <h1 className="mt-5 text-blue-600">{product.price}원</h1>
            </div>
            <div className="fixed w-full bottom-0 left-0
            p-5 pb-10 bg-neutral-800 flex justify-between items-center">
                <span className="font-semibold text-lg">{formatToWon(product.price)}원</span>
                <div className="flex gap-5">
                    <form action={deleteProduct}>{isOwner ? <button className="bg-red-500 px-5 py-2.5 rounded-md 
                text-white font-semibold">Delete product</button> : null}</form>
                    {isOwner ? <a href={`/products/${params.id}/update`} className="bg-blue-600 px-5 py-2.5 rounded-md 
                text-white font-semibold cursor-pointer">Update product</a> : null}
                </div>
                <Link className="bg-orange-500 px-5
                py-2.5 rounded-md text-white font-semibold" href={``}>채팅하기</Link>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const products = await db.product.findMany({
        select: {
            id: true
        }
    });
    const result = products.map((item) => ({ id: item.id + '' }))
    return result;
}