import { prisma } from "@/lib/prisma";

export async function createNotification(
  userId: number,
  type: string,
  title: string,
  message: string
) {
  return prisma.notification.create({
    data: { userId, type, title, message }
  });
}
