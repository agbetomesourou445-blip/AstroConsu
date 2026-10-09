import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const started = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      service: "astroconsu",
      database: "ok",
      latencyMs: Date.now() - started,
    });
  } catch {
    return NextResponse.json(
      { ok: false, service: "astroconsu", database: "error" },
      { status: 503 }
    );
  }
}
