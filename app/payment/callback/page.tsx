import PaymentCallbackClient from "./PaymentCallbackClient";

export const metadata = {
  title: "AstroConsu — Retour paiement",
  description: "Vérification du paiement de votre consultation.",
};

type PaymentCallbackPageProps = {
  searchParams: Promise<{
    consultationId?: string | string[];
  }>;
};

export default async function PaymentCallbackPage({
  searchParams,
}: PaymentCallbackPageProps) {
  const params = await searchParams;
  const rawConsultationId = params.consultationId;
  const consultationId = Array.isArray(rawConsultationId)
    ? rawConsultationId[0] ?? null
    : rawConsultationId ?? null;

  return <PaymentCallbackClient consultationId={consultationId} />;
}
