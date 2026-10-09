import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  const consultations = await prisma.consultation.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, phone: true, country: true } },
      assignedTo: { select: { id: true, name: true, email: true, role: true } },
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ consultations });
}
