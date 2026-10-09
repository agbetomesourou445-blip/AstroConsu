 "use client";
import { useState } from "react";

export function PayButton({ consultationId, amount }: { consultationId: number; amount: string | number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true); setError("");
    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultationId })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error ?? "Impossible de lancer le paiement.");
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  }

  return <div>
    <button className="button primary" onClick={pay} disabled={loading}>{loading ? "Préparation..." : `Payer ${Number(amount).toLocaleString("fr-FR")} XOF`}</button>
    {error && <p className="error">{error}</p>}
  </div>;
}
