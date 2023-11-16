"use client";

import {createContext, useContext, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [updatingProduct, setUpdatingProduct] = useState(null)
    const [uploading, setUploading] = useState(false);

    const router = useRouter();

    const uploadImages = (e) => {
      console.log(e.target.files);
    };

    const deleteImage = (public_id) => {

    };

    const createProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/product`, {
                method: "POST",
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.e);
            } else {
                toast.success(`Produto "${data?.title}" cadastrado`);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchProducts = async (page = 1) => {
        try {
            const response = await fetch(`${process.env.API}/product?page=${page}`, {
                method: "GET",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.e);
            } else {
                setProducts(data?.products);
                setCurrentPage(data?.currentPage);
                setTotalPages(data?.totalPages);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
                method: "PUT",
                body: JSON.stringify(updatingProduct),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.e);
            } else {
                toast.success(`Produto "${data?.title}" atualizado`);
                router.back();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.e);
            } else {
                toast.success(`Produto "${data?.title}" removido`);
                router.back();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                product,
                setProduct,
                products,
                setProducts,
                currentPage,
                setCurrentPage,
                totalPages,
                setTotalPages,
                updatingProduct,
                setUpdatingProduct,
                uploading,
                setUploading,
                uploadImages,
                deleteImage,
                createProduct,
                fetchProducts,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);