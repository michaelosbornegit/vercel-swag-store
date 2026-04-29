import { Suspense } from "react";

import { SearchForm } from "./search-form";
import { SearchResults, SearchResultsSkeleton } from "./search-results";

export default function SearchPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <SearchForm />
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
