import { searchProducts } from "@/lib/server/products-dto";

import { KeyedSearchSuspense } from "./keyed-search-suspense";
import { SearchForm } from "./search-form";
import {
  ProductsGrid,
  SearchResults,
  SearchResultsSkeleton,
} from "./search-results";

export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  // cached, resolves at build and shows 20 products for default state
  const defaultProducts = await searchProducts({});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <SearchForm />
      <KeyedSearchSuspense
        defaultFallback={<ProductsGrid products={defaultProducts} />}
        queryFallback={<SearchResultsSkeleton />}
      >
        <SearchResults searchParams={props.searchParams} />
      </KeyedSearchSuspense>
    </div>
  );
}
