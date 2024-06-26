import Update_Product from "./UpdateProduct";
import { getCachedProduct } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function UpdateProduct({ params }: { params: { id: number } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const product = await getCachedProduct(id)();
    if (!product) {
        return notFound();
    }
    return <Update_Product title={product.title} price={product.price} description={product.description} photo={product.photo} productId={id} />
}