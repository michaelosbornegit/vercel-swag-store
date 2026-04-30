import "server-only";

import { ApiError, authenticatedFetch } from "../api";

export type RawPromotion = {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
};

export async function fetchActivePromotionRaw(): Promise<RawPromotion | null> {
  try {
    const { data } = await authenticatedFetch<RawPromotion>("promotions");
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.code === "NOT_FOUND") return null;
    throw err;
  }
}
