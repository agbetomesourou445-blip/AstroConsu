import Link from "next/link";
export default function PaymentIndex() {
  return <div className="page narrow"><span className="eyebrow">💳 PAIEMENT</span><h1>Paiement sécurisé</h1><p>Sélectionnez une consultation depuis votre espace personnel pour continuer.</p><Link className="button primary" href="/dashboard">Retour à mon espace</Link></div>;
}
