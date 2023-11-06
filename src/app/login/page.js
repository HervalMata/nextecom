"use client";

import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("customer@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (!result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Logado com sucesso");
      router.push(callbackUrl);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5 bg-light p-5 shadow">
            <h2 className="mb-4">Entre</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-4"
                placeholder="Seu Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-4"
                placeholder="Sua Senha"
              />
              <button
                className="btn btn-primary btn-raised"
                disabled={loading || !email || !password}
              >
                {loading ? "Por favor espere..." : "Entrar"}
              </button>  
              <button
                className="btn btn-danger btn-raised mb-4"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Entre com Google
              </button> 
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}