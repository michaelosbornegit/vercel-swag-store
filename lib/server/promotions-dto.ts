import "server-only";

import { fetchActivePromotionRaw, type RawPromotion } from "./promotions-api";

export type PromotionDTO = {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
};

/**
 * Fetch the currently active promotion. Intentionally NOT cached — the spec
 * says the API may return a different promotion on each request, so we want
 * fresh data per page render.
 */
export async function getActivePromotion(): Promise<PromotionDTO | null> {
  const raw = await fetchActivePromotionRaw();
  if (!raw) return null;
  return toPromotionDTO(raw);
}

function toPromotionDTO(raw: RawPromotion): PromotionDTO {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    code: raw.code,
    discountPercent: raw.discountPercent,
  };
}
