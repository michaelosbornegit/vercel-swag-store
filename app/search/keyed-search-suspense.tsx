"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

export function KeyedSearchSuspense({
  defaultFallback,
  queryFallback,
  children,
}: {
  defaultFallback: ReactNode;
  queryFallback: ReactNode;
  children: ReactNode;
}) {
  const params = useSearchParams();
  const query = params.get("query") ?? "";
  const category = params.get("category") ?? "";
  const isFiltering = Boolean(query || category);

  return (
    <Suspense
      key={`${query}|${category}`}
      fallback={isFiltering ? queryFallback : defaultFallback}
    >
      {children}
    </Suspense>
  );
}
