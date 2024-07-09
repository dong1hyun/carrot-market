"use client"

import { useEffect, useRef, useState } from "react";
import { InitialProducts } from "../(tabs)/home/page";
import Product from "./productIcon";
import { getMoreProducts } from "../(tabs)/home/actions";

interface ProductList {
    initialProducts: InitialProducts
}

export default function ProductList({ initialProducts }: ProductList) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const trigger = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries: IntersectionObserverEntry[],
                observer: IntersectionObserver) => {
                const element = entries[0];
                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current);
                    setIsLoading(true);
                    const newProducts = await getMoreProducts(page + 1);
                    if (newProducts.length !== 0) {
                        setPage(prev => prev + 1); // 받은 상품 배열이 0개가 아닐 때만 다음 페이지로 넘어감 
                        // setProducts(cur => [...cur, ...newProducts]);
                    } else {
                        setIsLastPage(true);
                    }
                    setIsLoading(false);
                }
            },
            {
                threshold: 1.0,
                rootMargin: "0px 0px -200px 0px" //observer 범위 설정
            }
        );
        if (trigger.current) {
            observer.observe(trigger.current);
        }
        return () => {
            observer.disconnect();
        }
    }, [page]);
    return (
        <div className="p-5 flex flex-col gap-5">
            {products.map((product) => (
                <Product key={product.id} {...product} />
            ))}
            {/* {!isLastPage ? (
                <span
                    ref={trigger}
                    style={{
                        marginTop: `${page + 1 * 90}vh`,
                    }}
                    className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
                >
                    {isLoading ? "로딩 중" : "Load more"}
                </span>
            ) : null} */}
        </div>
    );
}