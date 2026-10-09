import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const body = await request.json();
  const consultationId = Number(body.consultationId);
  if (!Number.isInteger(consultationId)) return NextResponse.json({ error: "Consultation invalide." }, { status: 400 });

  const consultation = await prisma.consultation.findFirst({ where: { id: consultationId, userId: user.id } });
  if (!consultation) return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });

  const updated = await prisma.consultation.update({
    where: { id: consultationId },
    data: { humanRequested: true, status: consultation.status === "PAID" ? "PROCESSING" : consultation.status }
  });

  await audit(user.id, "HUMAN_CONSULTANT_REQUESTED", "Consultation", consultationId);

  return NextResponse.json({ consultation: updated });
}
