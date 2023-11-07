{"use client"}
import CategoryCreate from "@/components/category/CategoryCreate";
import CategoryList from "@/components/category/categoryList";

export default function Categories() {
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                    <p className="lead">Criar Categoria</p>
                    <CategoryCreate />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <p className="lead mb-4">Lista de Categorias</p>
                    <CategoryList />
                </div>
            </div>
        </div>
    );
}