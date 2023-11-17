"use client";

import {useProduct} from "@/context/product";
import {useEffect} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function ProductList() {
    const {
        products,
        currentPage,
        totalPages,
        fetchProducts,
        setUpdatingProduct,
    } = useProduct();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        fetchProducts(page);
    }, []);

    return (
        <div className="container my-5">
            <div className="row">
                <pre>{JSON.stringify(products, null, 4)}</pre>
            </div>
        </div>
    );
}