"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

const consultationOptions = [
  { value: "PERSONAL", label: "Consultation personnelle", price: "3 000 XOF" },
  { value: "DREAM", label: "Rêve & symbolique", price: "1 500 XOF" },
  { value: "TAROT", label: "Lecture tarot", price: "2 000 XOF" },
  { value: "ASTROLOGY", label: "Thème astral", price: "3 000 XOF" },
];

export default function ConsultationsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        setMessage(json.error ?? "Votre demande n’a pas pu être envoyée.");
        return;
      }

      setMessage(`Demande enregistrée (${Number(json.consultation.price).toLocaleString("fr-FR")} XOF). Rendez-vous dans votre espace pour finaliser le paiement.`);
    } catch {
      setMessage("Le formulaire est momentanément indisponible. Réessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page narrow">
      <section className="page-hero">
        <span className="eyebrow">ACCOMPAGNEMENT · RÉFLEXION · GUIDANCE</span>
        <div className="page-heading-icon" aria-hidden="true">✦</div>
        <h1>Choisissez votre espace de consultation</h1>
        <p className="lead">Chaque séance est pensée comme une rencontre de réflexion. Vous pouvez poser une question, exprimer un thème de vie et recevoir une lecture à la fois symbolique, attentive et structurée.</p>
      </section>

      <div className="notice-card">
        <strong>Un cadre de confiance</strong>
        <p>Les interprétations sont présentées comme des outils de réflexion personnelle. Elles ne remplacent ni un conseil professionnel ni une certitude absolue.</p>
      </div>

      <div className="grid consultation-options-grid">
        {consultationOptions.map((option) => (
          <div className="card consultation-option-card" key={option.value}>
            <span className="card-kicker">{option.label}</span>
            <h2>{option.price}</h2>
            <p>Pour une exploration plus claire du thème qui vous occupe.</p>
          </div>
        ))}
      </div>

      <form className="form-card consultation-form" onSubmit={submit}>
        <h2>Construire votre demande</h2>

        <label>
          Type de consultation
          <select name="type" defaultValue="PERSONAL">
            {consultationOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label} — {option.price}</option>
            ))}
          </select>
        </label>

        <label>
          Sujet
          <input name="subject" type="text" placeholder="Ex. : relation, travail, prise de décision, rêve, cycle personnel" />
        </label>

        <label>
          Votre question
          <textarea name="question" rows={7} placeholder="Décrivez le thème qui vous préoccupe et ce que vous souhaitez mieux comprendre." required />
        </label>

        <label>
          Informations complémentaires
          <textarea name="additionalInfo" rows={5} placeholder="Contexte, éléments de votre vie, éléments de tension ou de changement…" />
        </label>

        <button className="button primary" type="submit" disabled={loading}>
          {loading ? "Envoi en cours…" : "Créer la demande"}
        </button>

        {message && <div className="premium"><p>{message}</p></div>}
      </form>

      <section className="premium consultation-info-card">
        <h2>Un parcours de paiement sécurisé</h2>
        <p>Après validation de votre demande, votre espace vous redirigera vers un paiement sécurisé via FedaPay. Une fois le règlement finalisé, votre consultation pourra être suivie avec clarté.</p>
        <Link href="/dashboard" className="button secondary">Accéder à mon espace</Link>
      </section>

      <ContactButtons />
    </div>
  );
}
