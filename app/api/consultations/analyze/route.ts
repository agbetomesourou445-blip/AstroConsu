import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { askAI, CONSULTATION_SYSTEM } from "@/lib/ai";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  try {
    const { consultationId } = await request.json();
    const id = Number(consultationId);
    const c = await prisma.consultation.findFirst({ where: { id, userId: user.id } });
    if (!c) return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });
    if (c.status !== "PAID") return NextResponse.json({ error: "La consultation doit être payée avant l'analyse IA." }, { status: 403 });
    const content = await askAI(CONSULTATION_SYSTEM, `Type : ${c.type}\nSujet : ${c.subject ?? "Non précisé"}\nQuestion : ${c.question}\nInformations : ${c.additionalInfo ?? "Aucune"}`);
    const analysis = await prisma.consultationAnalysis.create({ data: { consultationId: id, type: "AI", content, spiritualAdvice: "Lecture symbolique et réflexive.", practicalAdvice: "Transformez les pistes retenues en actions concrètes." } });
    return NextResponse.json({ analysis }, { status: 201 });
  } catch (e) { console.error(e); return NextResponse.json({ error: e instanceof Error ? e.message : "Analyse impossible." }, { status: 500 }); }
}
