import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { askAI, DREAM_SYSTEM } from "@/lib/ai";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  try {
    const { dreamId } = await request.json();
    const id = Number(dreamId);
    if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Rêve invalide." }, { status: 400 });
    const dream = await prisma.dream.findFirst({ where: { id, userId: user.id } });
    if (!dream) return NextResponse.json({ error: "Rêve introuvable." }, { status: 404 });
    const content = await askAI(DREAM_SYSTEM, `Titre : ${dream.title ?? "Sans titre"}\nÉmotions : ${dream.emotions ?? "Non précisées"}\nContexte : ${dream.context ?? "Non précisé"}\nRécit :\n${dream.description}`);
    const analysis = await prisma.dreamAnalysis.create({ data: { dreamId: id, type: "AI", title: "Analyse symbolique IA", content, spiritualView: "Lecture symbolique et traditionnelle.", practicalAdvice: "Utilisez cette analyse comme piste de réflexion, pas comme prédiction." } });
    return NextResponse.json({ analysis }, { status: 201 });
  } catch (e) { console.error(e); return NextResponse.json({ error: e instanceof Error ? e.message : "Analyse impossible." }, { status: 500 }); }
}
