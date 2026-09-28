import { create } from "zustand";

/**
 * In-app navigation history. Next.js doesn't expose whether the previous
 * history entry belongs to this site, so we track it ourselves: AppShell
 * pushes every route it renders, and "Back to catalog" uses it to decide
 * between `router.back()` (restores filters and scroll exactly) and a fresh
 * push to the last catalog URL.
 */
type NavHistoryState = {
  entries: string[];
  lastCatalogHref: string;
  record: (href: string) => void;
};

export const useNavHistory = create<NavHistoryState>((set) => ({
  entries: [],
  lastCatalogHref: "/",
  record: (href) =>
    set((state) => {
      if (state.entries[state.entries.length - 1] === href) return state;
      const isCatalog = href === "/" || href.startsWith("/?");
      return {
        entries: [...state.entries, href].slice(-50),
        lastCatalogHref: isCatalog ? href : state.lastCatalogHref,
      };
    }),
}));

export const previousEntry = (entries: string[]) =>
  entries.length >= 2 ? entries[entries.length - 2] : null;

export const isCatalogHref = (href: string | null) =>
  href !== null && (href === "/" || href.startsWith("/?"));

