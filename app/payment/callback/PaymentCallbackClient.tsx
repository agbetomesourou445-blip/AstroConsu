"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PaymentCallbackClientProps = {
  consultationId: string | null;
};

export default function PaymentCallbackClient({
  consultationId,
}: PaymentCallbackClientProps) {
  const [status, setStatus] = useState("Vérification du paiement...");

  useEffect(() => {
    if (!consultationId) {
      setStatus("Consultation introuvable.");
      return;
    }

    let active = true;

    async function check() {
      const res = await fetch(
        `/api/payments/status?consultationId=${encodeURIComponent(consultationId)}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("PAYMENT_STATUS_REQUEST_FAILED");
      }

      const json = await res.json();

      if (!active) return;

      if (json.payment?.status === "SUCCESS") {
        setStatus("Paiement confirmé. Votre consultation est maintenant payée.");
      } else if (json.payment?.status === "FAILED") {
        setStatus("Le paiement n'a pas été confirmé.");
      } else {
        setStatus(
          "Paiement reçu ou encore en traitement. La confirmation peut prendre quelques instants."
        );
      }
    }

    check().catch(() => {
      if (active) {
        setStatus("Impossible de vérifier le paiement pour le moment.");
      }
    });

    const timer = setInterval(() => {
      check().catch(() => {
        // Une nouvelle tentative sera effectuée automatiquement.
      });
    }, 5000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [consultationId]);

  return (
    <div className="page narrow">
      <span className="eyebrow">💳 RETOUR PAIEMENT</span>
      <h1>{status}</h1>
      <p>
        La validation définitive est basée sur la notification sécurisée du
        prestataire, pas uniquement sur les paramètres de l’URL.
      </p>
      <Link href="/dashboard" className="button primary">
        Retour à mon espace
      </Link>
    </div>
  );
}
