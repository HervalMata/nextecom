"use client";

import ProductList from "@/components/product/admin/ProductList";

export default function ListProducts() {
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                    <p className="lead mb-4">Lista de Produtos</p>
                    <ProductList />
                </div>
            </div>
        </div>
    );
}