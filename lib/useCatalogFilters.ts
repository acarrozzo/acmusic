"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FiltersState } from "@/lib/filters";

/**
 * Catalog filters live in the URL (`/?group=…&tags=a,b&q=…`) so that the
 * browser Back button and shared links restore the same view.
 */
export const filtersFromParams = (params: URLSearchParams): FiltersState => ({
  search: params.get("q") ?? "",
  groupId: params.get("group") ?? "all",
  tags: (params.get("tags") ?? "").split(",").filter(Boolean),
});

export const paramsFromFilters = (filters: FiltersState) => {
  const params = new URLSearchParams();
  if (filters.groupId !== "all") params.set("group", filters.groupId);
  if (filters.tags.length > 0) params.set("tags", filters.tags.join(","));
  if (filters.search.trim()) params.set("q", filters.search.trim());
  return params;
};

export const catalogHref = (filters: FiltersState) => {
  const query = paramsFromFilters(filters).toString();
  return query ? `/?${query}` : "/";
};

export const hasActiveFilters = (filters: FiltersState) =>
  filters.search.trim() !== "" ||
  filters.groupId !== "all" ||
  filters.tags.length > 0;

export function useCatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const isCatalog = pathname === "/";

  const apply = useCallback(
    (next: FiltersState) => {
      const href = catalogHref(next);
      // Typing in search should not pile up history entries; leaving a song
      // page for the catalog should.
      if (isCatalog) router.replace(href, { scroll: false });
      else router.push(href);
    },
    [isCatalog, router],
  );

  const setSearch = useCallback(
    (search: string) => apply({ ...filters, search }),
    [apply, filters],
  );
  const setGroup = useCallback(
    (groupId: string | "all") => apply({ ...filters, groupId }),
    [apply, filters],
  );
  const toggleTag = useCallback(
    (tag: string) =>
      apply({
        ...filters,
        tags: filters.tags.includes(tag)
          ? filters.tags.filter((t) => t !== tag)
          : [...filters.tags, tag],
      }),
    [apply, filters],
  );
  const clear = useCallback(
    () => apply({ search: "", groupId: "all", tags: [] }),
    [apply],
  );

  return {
    filters,
    isCatalog,
    hasActiveFilters: hasActiveFilters(filters),
    setSearch,
    setGroup,
    toggleTag,
    clear,
  };
}
