"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoryDTO } from "@/lib/server/categories-dto";

const ALL_CATEGORIES = "__all__";

export function SearchForm({ categories }: { categories: CategoryDTO[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function pushParams(next: { query?: string; category?: string }) {
    const params = new URLSearchParams(searchParams);
    if (next.query !== undefined) {
      if (next.query) params.set("query", next.query);
      else params.delete("query");
    }
    if (next.category !== undefined) {
      if (next.category && next.category !== ALL_CATEGORIES) {
        params.set("category", next.category);
      } else {
        params.delete("category");
      }
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleAutoSearch = useDebouncedCallback((term: string) => {
    if (term.length === 0 || term.length >= 3) pushParams({ query: term });
  }, 300);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        pushParams({ query: String(formData.get("query") ?? "") });
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
      <Select
        value={searchParams.get("category") ?? ALL_CATEGORIES}
        onValueChange={(value) => pushParams({ category: value })}
      >
        <SelectTrigger className="sm:w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}
