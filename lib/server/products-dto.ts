import "server-only";

import { fetchFeaturedProductsRaw, RawProduct } from "./products-api";
import { ProductSummaryDTO } from "@/components/product-card";

export async function getFeaturedProducts(): Promise<ProductSummaryDTO[]> {
  const raw = await fetchFeaturedProductsRaw();
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
