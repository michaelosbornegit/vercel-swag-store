import "server-only";

import {
  fetchFeaturedProductsRaw,
  fetchProductsRaw,
  RawProduct,
} from "./products-api";
import { ProductSummaryDTO } from "@/components/product-card";
import { cacheLife, cacheTag } from "next/cache";

export async function getFeaturedProducts(): Promise<ProductSummaryDTO[]> {
  const raw = await fetchFeaturedProductsRaw();
  return raw.map(toProductSummaryDTO);
}

export async function searchProducts(opts: {
  query?: string;
  category?: string;
  limit?: string;
}): Promise<ProductSummaryDTO[]> {
  "use cache";
  cacheTag("products", "products-search");
  cacheLife("hours");

  // Default 20; active query shows 5 per spec
  const limit = opts.limit ?? (opts.query ? "5" : "20");

  const raw = await fetchProductsRaw({
    search: opts.query,
    category: opts.category,
    limit,
  });
  return raw.map(toProductSummaryDTO);
}

function toProductSummaryDTO(raw: RawProduct): ProductSummaryDTO {
  return {
    id: raw.id,
    slug: raw.slug || "",
    images: raw.images || [],
    name: raw.name || "",
    price: raw.price || 0,
  };
}
