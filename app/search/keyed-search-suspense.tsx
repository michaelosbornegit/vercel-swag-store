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

  return (
    <Suspense key={query} fallback={query ? queryFallback : defaultFallback}>
      {children}
    </Suspense>
  );
}
