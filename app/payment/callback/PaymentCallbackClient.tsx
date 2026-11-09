"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PaymentState = "checking" | "pending" | "success" | "failed" | "error" | "missing";

export default function PaymentCallbackClient({ consultationId }: { consultationId: string | null }) {
  const [state, setState] = useState<PaymentState>(consultationId ? "checking" : "missing");

  useEffect(() => {
    if (!consultationId) return;
    const id = consultationId;

    let active = true;
    let timer: number | undefined;

    async function check() {
      try {
        const response = await fetch(`/api/payments/status?consultationId=${encodeURIComponent(id)}`, { cache: "no-store" });
        if (!response.ok) throw new Error("PAYMENT_STATUS_REQUEST_FAILED");
        const data = await response.json();
        if (!active) return;

        const paymentStatus = data.payment?.status;
        if (paymentStatus === "SUCCESS") {
          setState("success");
          if (timer !== undefined) window.clearInterval(timer);
        } else if (["FAILED", "CANCELLED", "REFUNDED"].includes(paymentStatus)) {
          setState("failed");
          if (timer !== undefined) window.clearInterval(timer);
        } else {
          setState("pending");
        }
      } catch {
        if (active) setState("error");
      }
    }

    void check();
    timer = window.setInterval(() => { void check(); }, 5000);
    return () => {
      active = false;
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [consultationId]);

  const messages: Record<PaymentState, { title: string; detail: string }> = {
    checking: { title: "Vérification du paiement", detail: "Nous vérifions la confirmation auprès du prestataire de paiement." },
    pending: { title: "Confirmation en cours", detail: "La confirmation peut prendre quelques instants. Cette page se met à jour automatiquement." },
    success: { title: "Paiement confirmé", detail: "Votre consultation est maintenant réglée. Vous pouvez retrouver son suivi dans votre espace." },
    failed: { title: "Paiement non confirmé", detail: "Le prestataire n’a pas confirmé le règlement. Vous pouvez vérifier votre espace ou réessayer." },
    error: { title: "Vérification momentanément indisponible", detail: "Nous n’avons pas pu vérifier le statut. Consultez votre espace dans quelques instants." },
    missing: { title: "Référence de consultation manquante", detail: "Aucune consultation n’est associée à cette page de retour." },
  };

  const current = messages[state];
  return (
    <div className="page narrow payment-callback-page">
      <section className="payment-result-card" aria-live="polite" aria-atomic="true">
        <span className={`payment-orbit payment-orbit-${state}`} aria-hidden="true">{state === "success" ? "✓" : state === "failed" ? "!" : "✦"}</span>
        <span className="eyebrow">ESPACE DE PAIEMENT</span>
        <h1>{current.title}</h1>
        <p>{current.detail}</p>
        {consultationId && <p className="payment-reference">Référence de consultation : {consultationId}</p>}
        <div className="actions payment-result-actions">
          <Link href="/dashboard" className="button primary">Retour à mon espace</Link>
          <Link href="/consultations" className="button ghost">Voir les consultations</Link>
        </div>
        <p className="disclaimer">Le statut définitif dépend de la confirmation sécurisée du prestataire, et non des seuls paramètres de cette adresse.</p>
      </section>
    </div>
  );
}
