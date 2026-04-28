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

export async function fetchProductsRaw(params: {
  page?: string;
  search?: string;
  category?: string;
  limit?: string;
}): Promise<RawProduct[]> {
  const searchParams: Record<string, string> = {};
  if (params.page) searchParams.page = params.page;
  if (params.search) searchParams.search = params.search;
  if (params.category) searchParams.category = params.category;
  if (params.limit) searchParams.limit = params.limit;

  const response = await authenticatedFetch<RawProduct[]>(
    "products",
    searchParams,
  );
  return response.data;
}
