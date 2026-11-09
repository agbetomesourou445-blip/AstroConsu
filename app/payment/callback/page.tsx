import PaymentCallbackClient from "./PaymentCallbackClient";

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ consultationId?: string }>;
}) {
  const { consultationId } = await searchParams;
  return <PaymentCallbackClient consultationId={consultationId ?? null} />;
}
