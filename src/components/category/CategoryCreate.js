"use client";

import {useCategory} from "@/context/category";

export default function AdminCreateCategory() {
    const {
        name,
        setName,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategory()

    return (
        <>
            <p>Criar Categoria</p>
            <input
                type="text"
                value={updatingCategory ? updatingCategory.name : name}
                onChange={updatingCategory
                    ? setUpdatingCategory({ ...updatingCategory, name: e.target.value })
                    : setName(e.target.value)
                }
                className="form-control py-2 my-2"
            />

            {/*<pre>{JSON.stringify(categoryUpdate, null, 4)}</pre>*/}

            <div className="d-flex justify-content-between">
                <button
                    className={`
                        btn bg-${updatingCategory ? "info" : "primary"} text-light
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        updatingCategory ? updateCategory() : createCategory();
                    }}
                >
                    {updatingCategory ? "Atualizar" : "Cadastrar"}
                </button>

                {updatingCategory && (
                    <>
                        <button
                            className={`
                                btn bg-danger text-light
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                deleteCategory();
                            }}
                        >
                            Remover
                        </button>

                        <button
                            className="btn bg-success text-light"
                            onClick={() => setUpdatingCategory(null)}
                        >
                            Limpar
                        </button>
                    </>
                )}
            </div>
        </>
    );
}