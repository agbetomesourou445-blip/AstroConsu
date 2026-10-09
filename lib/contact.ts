export const CONTACTS = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/message/PIQJ7XBLTNLWO1",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/AstroConsuPR"
} as const;
