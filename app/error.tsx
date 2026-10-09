"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="container"><h1>Une erreur est survenue</h1><p>Veuillez réessayer.</p><button className="button primary" onClick={() => reset()}>Réessayer</button></main>;
}
