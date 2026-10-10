import PaymentCallbackClient from "./PaymentCallbackClient";

export const metadata = {
  title: "AstroConsu — Retour paiement",
  description: "Vérification du paiement de votre consultation.",
};

export default function PaymentCallbackPage() {
  return <PaymentCallbackClient />;
}
