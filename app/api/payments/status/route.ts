import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const id = Number(new URL(request.url).searchParams.get("consultationId"));
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Consultation invalide." }, { status: 400 });
  }

  const payment = await prisma.payment.findFirst({
    where: { consultationId: id, userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true, amount: true, currency: true, transactionId: true, createdAt: true }
  });

  return NextResponse.json({ payment });
}
