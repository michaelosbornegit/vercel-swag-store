import { Suspense } from "react";

import { SearchForm } from "./search-form";
import { SearchResults, SearchResultsSkeleton } from "./search-results";

export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await props.searchParams;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>

      <SearchForm />

      <Suspense key={query ?? ""} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
