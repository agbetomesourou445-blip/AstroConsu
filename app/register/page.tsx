 "use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth/register", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) return setError(json.error ?? "Inscription impossible.");
    router.push("/dashboard");
    router.refresh();
  }

  return <div className="page narrow"><span className="eyebrow">✨ CRÉATION DE COMPTE</span><h1>Créer votre espace</h1>
    <form className="form-card" onSubmit={submit}>
      <label>Nom<input name="name" maxLength={120} /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label>Téléphone<input name="phone" maxLength={40} /></label>
      <label>Pays<input name="country" maxLength={80} placeholder="Bénin" /></label>
      <label>Mot de passe<input name="password" type="password" minLength={8} required /></label>
      {error && <p className="error">{error}</p>}
      <button className="button primary" disabled={loading}>{loading ? "Création..." : "Créer mon compte"}</button>
    </form>
    <p>Déjà inscrit ? <Link href="/login" className="learn">Se connecter</Link></p>
  </div>;
}
