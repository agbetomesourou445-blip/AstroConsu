import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { createNotification } from "@/lib/notifications";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const id = Number(new URL(request.url).searchParams.get("consultationId"));
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Consultation invalide." }, { status: 400 });

  const consultation = await prisma.consultation.findUnique({
    where: { id },
    select: { userId: true, assignedToId: true }
  });

  if (!consultation) return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });

  const allowed = consultation.userId === user.id || consultation.assignedToId === user.id || user.role === "ADMIN";
  if (!allowed) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });

  const messages = await prisma.consultationMessage.findMany({
    where: { consultationId: id, ...(user.role === "USER" ? { isInternal: false } : {}) },
    include: { sender: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const body = await request.json();
  const consultationId = Number(body.consultationId);
  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!Number.isInteger(consultationId) || !content || content.length > 10000) {
    return NextResponse.json({ error: "Message invalide." }, { status: 400 });
  }

  const consultation = await prisma.consultation.findUnique({
    where: { id: consultationId },
    select: { userId: true, assignedToId: true }
  });
  if (!consultation) return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });

  const isStaff = ["CONSULTANT", "ADMIN"].includes(user.role);
  const allowed = consultation.userId === user.id || consultation.assignedToId === user.id || user.role === "ADMIN";
  if (!allowed) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });

  const isInternal = isStaff && body.isInternal === true;
  const message = await prisma.consultationMessage.create({
    data: { consultationId, senderId: user.id, content, isInternal },
    include: { sender: { select: { id: true, name: true, role: true } } }
  });

  await audit(user.id, "CONSULTATION_MESSAGE_SENT", "Consultation", consultationId, { internal: isInternal });

  if (!isInternal) {
    const recipientId = user.id === consultation.userId ? consultation.assignedToId : consultation.userId;
    if (recipientId) {
      await createNotification(
        recipientId,
        "NEW_MESSAGE",
        "Nouveau message",
        `Un nouveau message est disponible dans la consultation #${consultationId}.`
      );
    }
  }

  return NextResponse.json({ message }, { status: 201 });
}
