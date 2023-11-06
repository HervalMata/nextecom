import Link from "next/link";
import { useSession, signOut } from "next-auth/react"

export default function TopNav() {
  const { data, status, loading } = useSession();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">
        NEXTECOM
      </Link>

      {status === "authenticated" ? (
        <div className="d-flex">
          <Link className="nav-link" href="/dashboard/user">
            {data?.user?.name}
          </Link>
          <a 
            className="nav-link pointer" 
            onClick={() => signOut({ callbackUrl: "/login" })}>
            Sair
          </a>
      </div>
      ) : status === "loading" ? (
          <div className="d-flex">
            <a className="nav-link text-danger">
              Carregando...
            </a>
        </div> 
      )
      : (
        <div className="d-flex">
        <Link className="nav-link" href="/login">
          Entre
        </Link>
        <Link className="nav-link" href="/register">
          Cadastre-se
        </Link>
      </div>
      )}
    </nav>
  );
}