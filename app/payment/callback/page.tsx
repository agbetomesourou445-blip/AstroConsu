"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentCallbackContent() {
  const params = useSearchParams();
  const consultationId = params.get("consultationId");

  const [status, setStatus] = useState("Vérification du paiement...");

  useEffect(() => {
    if (!consultationId) {
      setStatus("Identifiant de consultation manquant.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/payment/status?consultationId=${encodeURIComponent(
            consultationId
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la vérification du paiement.");
        }

        const data = await response.json();

        if (data.paid || data.status === "paid" || data.status === "completed") {
          setStatus("Paiement confirmé. Votre consultation est validée.");
        } else if (
          data.status === "pending" ||
          data.status === "processing"
        ) {
          setStatus(
            "Votre paiement est encore en cours de vérification. Veuillez patienter."
          );
        } else {
          setStatus(
            "Le paiement n'a pas encore été confirmé. Si vous avez bien payé, veuillez patienter quelques instants."
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus(
          "Impossible de vérifier le paiement pour le moment. Veuillez réessayer plus tard."
        );
      }
    };

    void verifyPayment();
  }, [consultationId]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl border p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Retour du paiement
        </h1>

        <p className="text-base leading-7 mb-6">
          {status}
        </p>

        {consultationId && (
          <p className="text-sm opacity-70 mb-6">
            Consultation : {consultationId}
          </p>
        )}

        <Link
          href="/"
          className="inline-flex rounded-lg px-5 py-3 font-medium border"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}

function PaymentCallbackFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl border p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Vérification du paiement
        </h1>

        <p>Chargement...</p>
      </div>
    </main>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<PaymentCallbackFallback />}>
      <PaymentCallbackContent />
    </Suspense>
  );
}