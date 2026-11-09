"use client";

import { useState } from "react";

export function PayButton({ consultationId, amount }: { consultationId: number; amount: string | number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Impossible de lancer le paiement pour le moment.");
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setError("Le paiement est momentanément indisponible. Réessayez ultérieurement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payment-action">
      <button className="button primary" onClick={pay} disabled={loading}>
        {loading ? "Préparation du paiement…" : `Payer ${Number(amount).toLocaleString("fr-FR")} XOF`}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
