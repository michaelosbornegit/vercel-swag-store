import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { fetchCategoriesRaw, type RawCategory } from "./categories-api";

export type CategoryDTO = {
  slug: string;
  name: string;
};

export async function getCategories(): Promise<CategoryDTO[]> {
  "use cache";
  cacheTag("products", "categories");
  cacheLife("hours");

  const raw = await fetchCategoriesRaw();
  return raw.map(toCategoryDTO);
}

function toCategoryDTO(raw: RawCategory): CategoryDTO {
  return {
    slug: raw.slug,
    name: raw.name,
  };
}
