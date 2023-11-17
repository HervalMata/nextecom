"use client";

import {useProduct} from "@/context/product";
import {useEffect} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
            <div className="row gx-3">
                <pre>{JSON.stringify(products, null, 4)}</pre>
                {products?.map((product) => (
                    <div key={product?._id} className="col-lg-6 my-3">
                        <div style={{ height: "200px", overflow: "hidden" }}>
                            <Image
                                src={product?.images[0]?.secure_url || "/images/default.jpeg"}
                                alt={product?.title}
                                width={500}
                                height={300}
                                style={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link href={`/product/${product?.slug}`}>
                                    ${product?.price?.toFixed(2)} {product?.title}
                                </Link>
                            </h5>

                            <p className="card-text">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            product?.description?.length > 160
                                                ? `${product?.description?.substring(0, 160)}...`
                                                : product?.description,
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col">
                    <nav className="d-flex justify-content-center">
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => {
                                const page = index + 1;
                                return (
                                    <li
                                        key={page}
                                        className={`page-item ${
                                            currentPage === page ? " ativo" : ""
                                        }`}
                                    >
                                        <Link
                                            className="page-link"
                                            href={`${pathname}?page=${page}`}
                                            as={`${pathname}?page=${page}`}
                                        >
                                            {page}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}