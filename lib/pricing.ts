export const CONSULTATION_PRICES = {
  DREAM: 1500,
  PERSONAL: 3000,
  TAROT: 2000,
  ASTROLOGY: 3000
} as const;

export type ConsultationType = keyof typeof CONSULTATION_PRICES;

export function getConsultationPrice(type: ConsultationType) {
  return CONSULTATION_PRICES[type];
}
