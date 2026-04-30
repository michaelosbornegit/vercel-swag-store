import "server-only";

import { authenticatedFetch } from "../api";

export type RawCategory = {
  slug: string;
  name: string;
  productCount: number;
};

export async function fetchCategoriesRaw(): Promise<RawCategory[]> {
  const { data } = await authenticatedFetch<RawCategory[]>("categories");
  return data;
}
