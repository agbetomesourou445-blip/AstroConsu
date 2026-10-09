import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requiredString } from "@/lib/validation";
import { getConsultationPrice, type ConsultationType } from "@/lib/pricing";

const allowedTypes = new Set<ConsultationType>(["DREAM", "PERSONAL", "TAROT", "ASTROLOGY"]);

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const consultations = await prisma.consultation.findMany({
    where: { userId: user.id },
    include: { analyses: { orderBy: { createdAt: "desc" } }, payments: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({ consultations });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  try {
    const body = await request.json();
    const type = typeof body.type === "string" ? body.type.toUpperCase() as ConsultationType : "PERSONAL";
    if (!allowedTypes.has(type)) {
      return NextResponse.json({ error: "Type de consultation invalide." }, { status: 400 });
    }

    const question = requiredString(body.question, "Question", 10000);
    const price = getConsultationPrice(type);

    const consultation = await prisma.consultation.create({
      data: {
        userId: user.id,
        type,
        subject: typeof body.subject === "string" ? body.subject.trim().slice(0, 200) : null,
        question,
        additionalInfo: typeof body.additionalInfo === "string" ? body.additionalInfo.trim().slice(0, 10000) : null,
        price,
        currency: "XOF"
      }
    });

    return NextResponse.json({ consultation }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Données invalides.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
