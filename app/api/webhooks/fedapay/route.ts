import { NextResponse } from "next/server";
import { Webhook } from "fedapay";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const secret = process.env.FEDAPAY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook secret non configuré." }, { status: 500 });

  const signature = request.headers.get("x-fedapay-signature");
  if (!signature) return NextResponse.json({ error: "Signature absente." }, { status: 400 });

  const rawBody = await request.text();

  try {
    const event = Webhook.constructEvent(rawBody, signature, secret) as {
      name?: string;
      entity?: { id?: number | string; status?: string };
    };

    const transactionId = event.entity?.id;
    if (transactionId === undefined || transactionId === null) {
      return NextResponse.json({ received: true });
    }

    const txId = String(transactionId);
    const status = event.name ?? event.entity?.status ?? "";

    if (status === "transaction.approved") {
      const payment = await prisma.payment.findFirst({ where: { transactionId: txId } });
      if (payment) {
        await prisma.$transaction([
          prisma.payment.update({ where: { id: payment.id }, data: { status: "SUCCESS" } }),
          ...(payment.consultationId
            ? [prisma.consultation.update({ where: { id: payment.consultationId }, data: { status: "PAID" } })]
            : [])
        ]);
      }
    } else if (status === "transaction.canceled" || status === "transaction.declined") {
      await prisma.payment.updateMany({ where: { transactionId: txId }, data: { status: "FAILED" } });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Invalid FedaPay webhook:", error);
    return NextResponse.json({ error: "Webhook invalide." }, { status: 400 });
  }
}
