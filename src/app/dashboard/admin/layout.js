import AdminNav from "@/components/nav/AdminNav";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <>
        <AdminNav />
        <Link
          className="nav-link"
          href="/dashboard/admin/product"
        >
          Adicionar Produto
        </Link>
        <Link
            className="nav-link"
            href="/dashboard/admin/products"
        >
            Lista de Produtos
        </Link>
        {children}
    </>
  );
}