"use client";

import {useProduct} from "@/context/product";
import {useCategory} from "@/context/category";
import {useEffect} from "react";

export default function ProductCreate() {
    const {
        product,
        setProduct,
        updatingProduct,
        setUpdatingProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
    } = useProduct();

    const { categories, fetchCategories } = useCategory();

    const imagePreviews = updatingProduct
        ? updatingProduct?.images ?? []
        : product?.images ?? [];

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <p className="lead">{updatingProduct ? "Atualizar" : "Cadastrar"} Produto</p>

            <input
                type="text"
                placeholder="Título"
                value={updatingProduct ? updatingProduct?.title : product?.title}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
                        : setProduct({ ...product, title: e.target.value })}
                className="form-control p-2 my-2"
            />

            <textarea
                rows="5"
                className="form-control p-2 mb-2"
                placeholder="Descrição"
                value={updatingProduct ? updatingProduct?.description : product?.description}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, description: e.target.value })
                        : setProduct({ ...product, description: e.target.value })}
            ></textarea>

            <input
                type="number"
                placeholder="Preço"
                min="1"
                value={updatingProduct ? updatingProduct?.price : product?.price}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, price: e.target.value })
                        : setProduct({ ...product, price: e.target.value })}
                className="form-control p-2 mb-2"
            />

            <input
                type="text"
                placeholder="Cor"
                value={updatingProduct ? updatingProduct?.color : product?.color}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, color: e.target.value })
                        : setProduct({ ...product, color: e.target.value })}
                className="form-control p-2 my-2"
            />

            <input
                type="text"
                placeholder="Marca"
                value={updatingProduct ? updatingProduct?.brand : product?.brand}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value })
                        : setProduct({ ...product, brand: e.target.value })}
                className="form-control p-2 my-2"
            />

            <input
                type="number"
                placeholder="Estoque"
                min="1"
                value={updatingProduct ? updatingProduct?.stock : product?.stock}
                onChange={(e) =>
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, stock: e.target.value })
                        : setProduct({ ...product, stock: e.target.value })}
                className="form-control p-2 mb-2"
            />

            <div className="form-group">
                <select
                    name="category"
                    className="form-control p-2 mb-2"
                    onChange={(e) => {
                        const categoryId = e.target.value;
                        const categoryName = e.target.options[e.target.selectedIndex].getAttribute("name");
                        const category = categoryId ? { _id: categoryId, name: categoryName } : null;

                        if (updatingProduct) {
                            setUpdatingProduct({
                                ...updatingProduct,
                                category,
                            });
                        } else {
                            setProduct({ ...product, category });
                        }
                    }}
                    value={
                        updatingProduct
                            ? updatingProduct?.category?._id
                            : product?.category?._id
                    }
                >
                    <option value="">Selecione a Categoria</option>
                    {categories?.map((c) => (
                        <option key={c._id} value={c._id} name={c?.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-3">
                <label className={`btn btn-primary col-12 ${uploading ? "disabled" : ""}`}>
                    {uploading ? "Processando..." : "Carregando imagens"}
                    <input
                        type="text"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={uploadImages}
                        disabled={uploading}
                    />
                </label>
            </div>

            <div className="d-flex justify-content-center">
                {imagePreviews?.map((img) => (
                    <div key={img?.public_id}>
                        <img
                            src={img?.secure_url}
                            className="img-thumbnail mx-1 shadow"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            alt="image"
                        />
                        <br/>
                        <div
                            className="text-center pointer"
                            onClick={() => deleteImage(img?.public_id)}
                        >
                           X
                        </div>
                    </div>
                ))}
            </div>

            <pre>{JSON.stringify(product, null, 4)}</pre>
        </div>
    );
}