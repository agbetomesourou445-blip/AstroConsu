"use client";

import { useState } from "react";

export function AnalyzeConsultationButton({ consultationId }: { consultationId: number }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function run() {
    setLoading(true);
    setMessage("");
    setError(false);
    try {
      const response = await fetch("/api/consultations/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(true);
        setMessage(data.error ?? "La lecture n’a pas pu être préparée. Réessayez dans quelques instants.");
      } else {
        setMessage(data.analysis?.content ?? "Votre lecture est prête.");
      }
    } catch {
      setError(true);
      setMessage("La lecture est momentanément indisponible. Vérifiez votre connexion puis réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reading-action">
      <button className="button secondary" onClick={run} disabled={loading}>
        {loading ? <><span className="button-spinner" aria-hidden="true" /> Préparation de votre lecture…</> : "✦ Découvrir ma lecture"}
      </button>
      {message && <div className={`premium reading-result ${error ? "error" : ""}`} role={error ? "alert" : "status"}><p>{message}</p></div>}
    </div>
  );
}
