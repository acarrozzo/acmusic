"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isCatalogHref, previousEntry, useNavHistory } from "@/lib/navHistory";

/**
 * "Back to catalog" for a song page. If the catalog is the previous history
 * entry, going back restores its filters and scroll exactly; otherwise jump
 * to the last catalog view we know about.
 */
export function useBackToCatalog() {
  const router = useRouter();
  const entries = useNavHistory((s) => s.entries);
  const href = useNavHistory((s) => s.lastCatalogHref);
  const cameFromCatalog = isCatalogHref(previousEntry(entries));

  const go = useCallback(() => {
    if (cameFromCatalog) router.back();
    else router.push(href, { scroll: false });
  }, [cameFromCatalog, href, router]);

  return { href, cameFromCatalog, go };
}
