import { Suspense } from "react";

import { searchProducts } from "@/lib/server/products-dto";

import { SearchForm } from "./search-form";
import { ProductsGrid, SearchResults } from "./search-results";

export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  // cached, resolves at build and shows 20 products for default state
  const defaultProducts = await searchProducts({});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <SearchForm />
      <Suspense fallback={<ProductsGrid products={defaultProducts} />}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
