import { getCurrentUser } from "@/lib/auth";

export async function requireRole(roles: Array<"USER" | "CONSULTANT" | "ADMIN">) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  if (!roles.includes(user.role as "USER" | "CONSULTANT" | "ADMIN")) throw new Error("FORBIDDEN");
  return user;
}
