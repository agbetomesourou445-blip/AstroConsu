import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

export async function GET() {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  const users = await prisma.user.findMany({
    select: { id:true, name:true, email:true, phone:true, country:true, role:true, createdAt:true },
    orderBy: { createdAt:"desc" }
  });
  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  const body = await request.json();
  const id = Number(body.userId);
  const role = body.role;
  if (!Number.isInteger(id) || !["USER","CONSULTANT","ADMIN"].includes(role)) {
    return NextResponse.json({ error: "Utilisateur ou rôle invalide." }, { status: 400 });
  }
  if (id === admin.id && role !== "ADMIN") {
    return NextResponse.json({ error: "Vous ne pouvez pas retirer votre propre rôle administrateur." }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id:true, name:true, email:true, role:true }
  });
  await audit(admin.id, "USER_ROLE_CHANGED", "User", id, { role });
  return NextResponse.json({ user });
}
