import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requiredString } from "@/lib/validation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const dreams = await prisma.dream.findMany({
    where: { userId: user.id },
    include: { analyses: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({ dreams });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  try {
    const body = await request.json();
    const description = requiredString(body.description, "Description du rêve", 10000);

    const dream = await prisma.dream.create({
      data: {
        userId: user.id,
        title: typeof body.title === "string" ? body.title.trim().slice(0, 160) : null,
        description,
        emotions: typeof body.emotions === "string" ? body.emotions.trim().slice(0, 3000) : null,
        context: typeof body.context === "string" ? body.context.trim().slice(0, 5000) : null,
        dreamDate: body.dreamDate ? new Date(body.dreamDate) : null
      }
    });

    return NextResponse.json({ dream }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Données invalides.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
