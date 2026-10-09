import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !["CONSULTANT", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Accès consultant requis." }, { status: 403 });
  }

  const consultations = await prisma.consultation.findMany({
    where: user.role === "ADMIN" ? {} : { assignedToId: user.id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true, country: true } },
      assignedTo: { select: { id: true, name: true, email: true } },
      messages: { orderBy: { createdAt: "asc" } }
    },
    orderBy: { updatedAt: "desc" }
  });

  return NextResponse.json({ consultations });
}
