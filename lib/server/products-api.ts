import "server-only";

import { ApiResponse, authenticatedFetch } from "../api";

export type RawProduct = {
  id: string;
  category?: string;
  createdAt?: string;
  currency?: string;
  description?: string;
  featured?: boolean;
  images?: string[];
  name?: string;
  price?: number;
  slug?: string;
  tags?: string[];
};

export async function fetchFeaturedProductsRaw(): Promise<RawProduct[]> {
  // TODO add pagination support through metadata in the response
  const response = await authenticatedFetch<RawProduct[]>("products", {
    featured: "true",
  });
  return response.data;
}
