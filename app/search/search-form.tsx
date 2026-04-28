"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function pushQuery(next: string) {
    const params = new URLSearchParams(searchParams);
    if (next) params.set("query", next);
    else params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleAutoSearch = useDebouncedCallback((term: string) => {
    if (term.length === 0 || term.length >= 3) pushQuery(term);
  }, 300);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        pushQuery(String(formData.get("query") ?? ""));
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <Input
        name="query"
        type="search"
        placeholder="Search products…"
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(e) => handleAutoSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
