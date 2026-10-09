 "use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const params = useSearchParams();
  const consultationId = params.get("consultationId");
  const [status, setStatus] = useState("Vérification du paiement...");

  useEffect(() => {
    if (!consultationId) return setStatus("Consultation introuvable.");
    let active = true;

    async function check() {
      if (!consultationId) return;
      const res = await fetch(`/api/payments/status?consultationId=${encodeURIComponent(consultationId)}`, { cache: "no-store" });
      const json = await res.json();
      if (!active) return;
      if (json.payment?.status === "SUCCESS") setStatus("Paiement confirmé. Votre consultation est maintenant payée.");
      else if (json.payment?.status === "FAILED") setStatus("Le paiement n'a pas été confirmé.");
      else setStatus("Paiement reçu ou encore en traitement. La confirmation peut prendre quelques instants.");
    }

    check();
    const timer = setInterval(check, 5000);
    return () => { active = false; clearInterval(timer); };
  }, [consultationId]);

  return <div className="page narrow"><span className="eyebrow">💳 RETOUR PAIEMENT</span><h1>{status}</h1><p>La validation définitive est basée sur la notification sécurisée du prestataire, pas uniquement sur les paramètres de l’URL.</p><Link href="/dashboard" className="button primary">Retour à mon espace</Link></div>;
}
