 "use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth/login", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) return setError(json.error ?? "Connexion impossible.");
    router.push("/dashboard");
    router.refresh();
  }

  return <div className="page narrow"><span className="eyebrow">🔐 CONNEXION</span><h1>Bienvenue</h1>
    <form className="form-card" onSubmit={submit}>
      <label>Email<input name="email" type="email" required /></label>
      <label>Mot de passe<input name="password" type="password" minLength={8} required /></label>
      {error && <p className="error">{error}</p>}
      <button className="button primary" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
    </form>
    <p>Pas encore de compte ? <Link href="/register" className="learn">Créer un compte</Link></p>
  </div>;
}
