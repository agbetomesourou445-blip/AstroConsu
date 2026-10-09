 "use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

export default function ConsultationsPage() {
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/consultations", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    const json = await res.json();
    setMessage(res.ok ? `Demande enregistrée (${Number(json.consultation.price).toLocaleString("fr-FR")} XOF). Rendez-vous dans votre espace pour payer.` : (json.error ?? "Connexion requise."));
  }
  return <div className="page narrow"><span className="eyebrow">🔮 CONSULTATIONS</span><h1>Choisissez votre accompagnement</h1>
    <div className="page-heading-icon" aria-hidden="true">✦</div><p>Les prix sont calculés côté serveur. Le paiement sécurisé FedaPay sera lancé depuis votre espace.</p>
    <form className="form-card" onSubmit={submit}>
      <label>Type
        <select name="type" defaultValue="PERSONAL">
          <option value="PERSONAL">Consultation personnelle — 3 000 XOF</option>
          <option value="DREAM">Consultation rêve — 1 500 XOF</option>
          <option value="TAROT">Consultation tarot — 2 000 XOF</option>
          <option value="ASTROLOGY">Consultation astrologique — 3 000 XOF</option>
        </select>
      </label>
      <label>Sujet<input name="subject" placeholder="Ex. Travail, relation, projet..." /></label>
      <label>Votre question<textarea name="question" rows={7} required placeholder="Que souhaitez-vous comprendre ?" /></label>
      <label>Informations complémentaires<textarea name="additionalInfo" rows={5} placeholder="Contexte, objectifs, préoccupations..." /></label>
      <button className="button primary">Créer la demande</button>
      {message && <p>{message}</p>}
    </form>
    <div className="premium"><h2>💳 Paiement</h2><p>FedaPay prend en charge les paiements disponibles sur votre compte marchand, notamment Mobile Money et carte. Commencez en mode sandbox avant le live.</p><Link href="/dashboard" className="button secondary">Mon espace</Link></div>
    <ContactButtons />
  </div>;
}
