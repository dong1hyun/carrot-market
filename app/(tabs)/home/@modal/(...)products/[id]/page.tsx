import Button from "@/app/components/xButton";
import { getProduct } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function foo() {
    await new Promise(resolve => setTimeout(resolve, 3000));
}

export default async function Modal({ params }: { params: { id: number } }) {
    const product = await getProduct(+params.id);
    if (product === null) notFound();
    // await foo();
    return (
        <div className="absolute items-center w-full h-full z-50 flex 
        justify-center bg-black left-0 top-0 bg-opacity-60">
            <Button />
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="relative aspect-square bg-neutral-700 
                text-neutral-200 rounded-xl
                flex justify-center items-center">
                    <Image className="rounded-xl" fill src={`${product?.photo}`} alt={product!.title} />
                </div>
                <div className="relative z-10 p-5">
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
                    </div>
            </div>
        </div>
    )
}