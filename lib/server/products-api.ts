import "server-only";

import { ApiError, authenticatedFetch } from "../api";

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

export type RawStock = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export async function fetchProductStockRaw(
  id: string,
): Promise<RawStock | null> {
  try {
    const { data } = await authenticatedFetch<RawStock>(`products/${id}/stock`);
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.code === "NOT_FOUND") return null;
    throw err;
  }
}

export async function fetchProductBySlugRaw(
  slug: string,
): Promise<RawProduct | null> {
  try {
    const { data } = await authenticatedFetch<RawProduct>(`products/${slug}`);
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.code === "NOT_FOUND") return null;
    throw err;
  }
}

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
