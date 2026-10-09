import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { configureFedaPay, getAppUrl } from "@/lib/fedapay";
import { Transaction } from "fedapay";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  try {
    const body = await request.json();
    const consultationId = Number(body.consultationId);

    if (!Number.isInteger(consultationId) || consultationId <= 0) {
      return NextResponse.json({ error: "Consultation invalide." }, { status: 400 });
    }

    const consultation = await prisma.consultation.findFirst({
      where: { id: consultationId, userId: user.id }
    });

    if (!consultation) {
      return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });
    }

    if (consultation.status === "PAID") {
      return NextResponse.json({ error: "Cette consultation est déjà payée." }, { status: 409 });
    }

    const existing = await prisma.payment.findFirst({
      where: { consultationId, userId: user.id, status: "PENDING" },
      orderBy: { createdAt: "desc" }
    });

    if (existing?.providerRef) {
      return NextResponse.json({ paymentId: existing.id, checkoutUrl: existing.providerRef });
    }

    const { environment } = configureFedaPay();
    const appUrl = getAppUrl();

    const firstName = user.name?.split(/\s+/)[0] || "Client";
    const lastName = user.name?.split(/\s+/).slice(1).join(" ") || "AstroConsu";

    const transaction = await Transaction.create({
      description: `AstroConsu - consultation ${consultation.type} #${consultation.id}`,
      amount: Number(consultation.price),
      callback_url: `${appUrl}/payment/callback?consultationId=${consultation.id}`,
      currency: { iso: "XOF" },
      customer: {
        firstname: firstName,
        lastname: lastName,
        email: user.email,
        ...(user.phone ? { phone_number: { number: user.phone, country: (user.country || "BJ").slice(0, 2).toUpperCase() } } : {})
      },
      custom_metadata: {
        consultationId: consultation.id,
        userId: user.id
      }
    } as never);

    const token = await transaction.generateToken();
    const checkoutUrl = token.url;
    const transactionId = String(transaction.id);

    const payment = existing
      ? await prisma.payment.update({
          where: { id: existing.id },
          data: { transactionId, providerRef: checkoutUrl, amount: consultation.price, status: "PENDING", provider: "fedapay", method: "OTHER" }
        })
      : await prisma.payment.create({
          data: {
            userId: user.id,
            consultationId: consultation.id,
            provider: "fedapay",
            method: "OTHER",
            transactionId,
            providerRef: checkoutUrl,
            amount: consultation.price,
            currency: "XOF",
            status: "PENDING",
            metadata: { environment }
          }
        });

    return NextResponse.json({ paymentId: payment.id, checkoutUrl });
  } catch (error) {
    console.error("FedaPay payment creation error:", error);
    const message = error instanceof Error ? error.message : "Impossible de créer le paiement.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
