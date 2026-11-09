"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

type Dream = {
  id: number;
  title: string | null;
  description: string;
  analyses: { id: number; title: string | null; content: string }[];
};

export default function DreamsPage() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const response = await fetch("/api/dreams", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      setDreams(data.dreams ?? []);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    setBusy(true);
    try {
      const response = await fetch("/api/dreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          emotions: payload.emotions,
          context: payload.context,
          dreamDate: payload.dreamDate,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error ?? "Le rêve n’a pas pu être enregistré.");
        return;
      }
      event.currentTarget.reset();
      setMessage("Votre rêve a été enregistré. Vous pouvez maintenant demander une lecture symbolique.");
      await load();
    } catch {
      setMessage("L’enregistrement est momentanément indisponible. Réessayez dans quelques instants.");
    } finally {
      setBusy(false);
    }
  }

  async function analyze(id: number) {
    setBusy(true);
    setMessage("Lecture symbolique en cours…");
    try {
      const response = await fetch("/api/dreams/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamId: id }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error ?? "La lecture n’a pas pu être préparée.");
        return;
      }
      setMessage("Votre lecture a été préparée avec succès.");
      await load();
    } catch {
      setMessage("La lecture symbolique est temporairement indisponible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page narrow">
      <section className="page-hero">
        <span className="eyebrow">RÊVES · SYMBOLIQUE · RÉCIT</span>
        <div className="page-heading-icon" aria-hidden="true">☾</div>
        <h1>Comprendre le langage de vos rêves</h1>
        <p className="lead">Les rêves peuvent refléter des émotions, des souvenirs, des tensions ou des questions de fond. Ici, ils sont explorés comme des éléments symboliques, non comme des messages immuables.</p>
      </section>

      <div className="notice-card"><strong>Une lecture ouverte</strong><p>Le rêve est abordé comme un matériau de réflexion. Il peut guider votre attention, sans imposer une interprétation unique.</p></div>

      <form className="form-card dream-form" onSubmit={submit}>
        <h2>Racontez votre rêve</h2>
        <label>
          Titre du rêve
          <input name="title" type="text" placeholder="Ex. : Réveil au bord de la mer" maxLength={160} />
        </label>
        <label>
          Description du rêve
          <textarea name="description" rows={6} placeholder="Décrivez les images, les émotions et les éléments marquants…" required />
        </label>
        <label>
          Émotions ressenties
          <textarea name="emotions" rows={3} placeholder="Anxiété, sérénité, confusion…" />
        </label>
        <label>
          Contexte ou éléments de vie
          <textarea name="context" rows={3} placeholder="Ce qui se passe dans votre vie ou ce qui a précédé ce rêve…" />
        </label>
        <label>
          Date du rêve
          <input name="dreamDate" type="date" />
        </label>
        <button type="submit" className="button primary" disabled={busy}>
          {busy ? "Enregistrement…" : "Enregistrer le rêve"}
        </button>
      </form>

      {message && <div className="premium"><p>{message}</p></div>}

      <section className="section-block">
        <div className="section-intro">
          <span className="eyebrow">VOS ENREGISTREMENTS</span>
          <h2>Les rêves récents</h2>
        </div>
        {dreams.length === 0 ? (
          <div className="empty-state">
            <p>Aucun rêve enregistré pour le moment. Laissez votre récit s’écrire.</p>
          </div>
        ) : (
          <div className="dream-list">
            {dreams.map((dream) => (
              <article className="card dream-card" key={dream.id}>
                <div className="dream-topline">
                  <span className="card-kicker">RÊVE</span>
                  {dream.title && <h3>{dream.title}</h3>}
                </div>
                <p>{dream.description}</p>
                {dream.analyses?.length ? (
                  <div className="dream-analyses">
                    {dream.analyses.map((analysis) => (
                      <div className="analysis-item" key={analysis.id}>
                        <strong>{analysis.title ?? "Lecture symbolique"}</strong>
                        <p>{analysis.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button type="button" className="button secondary" onClick={() => analyze(dream.id)}>
                    Découvrir la lecture symbolique
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <ContactButtons />
      <p className="disclaimer">Les interprétations de rêve sont proposées comme outils de réflexion. Elles ne remplacent ni un accompagnement humain, ni un conseil professionnel.</p>
    </div>
  );
}
