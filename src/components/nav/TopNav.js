import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">
        NEXTECOM
      </Link>

      <div className="d-flex">
        <Link className="nav-link" href="/login">
          Entre
        </Link>
        <Link className="nav-link" href="/register">
          Cadastre-se
        </Link>
      </div>
    </nav>
  );
}