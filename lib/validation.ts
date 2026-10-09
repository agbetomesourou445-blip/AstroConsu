import { z } from "zod";

export const idSchema = z.coerce.number().int().positive();

export const consultationMessageSchema = z.object({
  consultationId: idSchema,
  message: z.string().trim().min(1).max(5000),
});

export const humanRequestSchema = z.object({
  consultationId: idSchema,
});

export const notificationReadSchema = z.object({
  id: idSchema,
});


export function requiredString(value: unknown, label: string, maxLength = 5000): string {
  if (typeof value !== "string") throw new Error(`${label} est requis.`);
  const result = value.trim();
  if (!result) throw new Error(`${label} est requis.`);
  if (result.length > maxLength) throw new Error(`${label} est trop long.`);
  return result;
}

export function validEmail(value: unknown): string {
  const email = requiredString(value, "Email", 320).toLowerCase();
  const parsed = z.string().email().safeParse(email);
  if (!parsed.success) throw new Error("Adresse email invalide.");
  return parsed.data;
}
