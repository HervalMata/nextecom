"use client";

import {createContext, useContext, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer";

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
        let files = e.target.files;

        let allUploadedFiles = updatingProduct
            ? updatingProduct.images || []
            : product
                ? product.images || []
                : [];

        if (files) {
            const totalImages = allUploadedFiles.length + files.length;
            if (totalImages > 4) {
                alert("You can't upload more than 4 images.");
                return;
            }

            setUploading(true);
            const uploadPromises = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const promise = new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        128,
                        720,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                            fetch(`${process.env.API}/admin/upload/image`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ image: uri }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    allUploadedFiles.unshift(data);
                                    resolve();
                                })
                                .catch((err) => {
                                    console.log("CLOUDINARY UPLOAD ERR", err);
                                    resolve();
                                });
                        },
                        "base64"
                    );
                });

                uploadPromises.push(promise);
            }

            Promise.all(uploadPromises)
                .then(() => {
                    updatingProduct
                        ? setUpdatingProduct({
                            ...updatingProduct,
                            images: allUploadedFiles,
                        })
                        : setProduct({ ...product, images: allUploadedFiles });

                    setUploading(false);
                })
                .catch((error) => {
                    console.log("Error uploading images: ", error);
                    setUploading(false);
                });
        }
    };

    const deleteImage = (public_id) => {
        setUploading(true);

        fetch(`${process.env.API}/admin/upload/image`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id }),
        })
            .then((response) => response.json())
            .then((data) => {
                const filteredImages = updatingProduct
                    ? updatingProduct.images.filter(
                        (image) => image.public_id !== public_id
                    )
                    : product.images.filter((image) => image.public_id !== public_id);
                updatingProduct
                    ? setUpdatingProduct({
                        ...updatingProduct,
                        images: filteredImages,
                    })
                    : setProduct({ ...product, images: filteredImages });
            })
            .catch((err) => {
                toast.error("Image delete failed");
                console.log("CLOUDINARY UPLOAD ERR", err);
            })
            .finally(() => {
                setUploading(false);
            });
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