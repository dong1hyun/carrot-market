"use client"

import { useState } from "react";
import { InitialProducts } from "../(tabs)/products/page";
import ListProduct from "./list-product";
import { getMoreProducts } from "../(tabs)/products/actions";

interface ProductList {
    initialProduct: InitialProducts
}

export default function ProductList({ initialProduct }: ProductList) {
    const [products, setProducts] = useState(initialProduct)
    const [isLoading, setIsLoading] = useState(false);
    const onLoadMoreClick = async () => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(1);
        setProducts(cur => [...cur, ...newProducts]);
        setIsLoading(false);
    }
    return (
        <div className="p-5 flex flex-col gap-5">
            {products.map(product => <ListProduct key={product.id}  {...product} />)}
            <button disabled={isLoading} onClick={onLoadMoreClick} className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md 
            hover:opacity-90 active:scale-95">{isLoading ? "로딩중" : "Load more"}</button>
        </div>
    )
}