import "server-only";

import {
  fetchFeaturedProductsRaw,
  fetchProductBySlugRaw,
  fetchProductsRaw,
  fetchProductStockRaw,
  RawProduct,
} from "./products-api";
import { ProductSummaryDTO } from "@/components/product-card";
import { ProductDetailsDTO } from "@/components/product-details";
import { cacheLife, cacheTag } from "next/cache";

export async function getFeaturedProducts(): Promise<ProductSummaryDTO[]> {
  "use cache";
  cacheTag("products", "featured-products");
  cacheLife("hours");

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

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetailsDTO | null> {
  "use cache";
  cacheTag("products", `product-${slug}`);
  cacheLife("hours");

  const raw = await fetchProductBySlugRaw(slug);
  if (!raw) return null;
  return toProductDetailsDTO(raw);
}

export async function getProductStock(id: string): Promise<number> {
  // No caching because stock is volatile per spec
  const raw = await fetchProductStockRaw(id);
  return raw?.stock ?? 0;
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

function toProductDetailsDTO(raw: RawProduct): ProductDetailsDTO {
  return {
    ...toProductSummaryDTO(raw),
    description: raw.description || "",
  };
}
