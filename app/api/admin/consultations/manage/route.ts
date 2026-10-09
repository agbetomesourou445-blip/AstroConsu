import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { createNotification } from "@/lib/notifications";

const statuses = new Set(["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED"]);

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  try {
    const body = await request.json();
    const id = Number(body.consultationId);
    if (!Number.isInteger(id)) return NextResponse.json({ error: "Consultation invalide." }, { status: 400 });

    const data: { assignedToId?: number | null; status?: "PENDING"|"PAID"|"PROCESSING"|"COMPLETED"|"CANCELLED"; humanRequested?: boolean } = {};
    if (body.assignedToId !== undefined) data.assignedToId = body.assignedToId === null ? null : Number(body.assignedToId);
    if (body.status && statuses.has(body.status)) data.status = body.status;
    if (typeof body.humanRequested === "boolean") data.humanRequested = body.humanRequested;

    const consultation = await prisma.consultation.update({
      where: { id },
      data,
      include: { user: { select: { id: true, name: true, email: true } } }
    });

    await audit(user.id, "CONSULTATION_UPDATED", "Consultation", id, data);

    if (data.status) {
      await createNotification(
        consultation.userId,
        "CONSULTATION_STATUS",
        "Mise à jour de votre consultation",
        `Votre consultation #${id} est maintenant au statut ${data.status}.`
      );
    }
    if (data.assignedToId) {
      await createNotification(
        data.assignedToId,
        "CONSULTATION_ASSIGNED",
        "Nouvelle consultation assignée",
        `La consultation #${id} vous a été assignée.`
      );
    }

    return NextResponse.json({ consultation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mise à jour impossible.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
