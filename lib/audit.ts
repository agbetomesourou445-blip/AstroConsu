import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function audit(
  actorId: number | null,
  action: string,
  entityType: string,
  entityId?: number,
  metadata?: Prisma.InputJsonValue
) {
  try {
    await prisma.auditLog.create({ data: { actorId, action, entityType, entityId, metadata } });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}
