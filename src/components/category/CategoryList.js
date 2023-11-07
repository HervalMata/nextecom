"use client";

import {useCategory} from "@/context/category";
import {useEffect} from "react";

export default function Categories() {
    const {
        categories,
        setUpdatingCategory,
        fetchCategories,
    } = useCategory();

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                    {categories.map((c) => {
                        <button
                            className="btn"
                            onClick={() => {
                                setUpdatingCategory();
                            }}
                        >
                            {c.name}
                        </button>
                    })}
                </div>
            </div>
        </div>
    );
}