"use client";
import { useState } from "react";

export function HumanRequestButton({ consultationId }: { consultationId: number }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function request() {
    setLoading(true);
    try {
      const response = await fetch("/api/consultations/request-human", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId }),
      });
      if (response.ok) setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="button ghost" disabled={loading || done} onClick={request}>
      {done ? "Demande envoyée ✓" : loading ? "Envoi en cours…" : "👤 Demander un accompagnement humain"}
    </button>
  );
}
