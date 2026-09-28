"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Play, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { groups } from "@/data/groups";
import { tracks } from "@/data/tracks";
import { getGroup, getTrack, orderedTracks, shuffleArray } from "@/lib/catalog";
import { filterTracks, sortTracks } from "@/lib/filters";
import { sortedGroups } from "@/lib/catalog";
import { catalogHref, useCatalogFilters } from "@/lib/useCatalogFilters";
import { usePlayerStore } from "@/lib/player/store";

type TopBarProps = {
  onMobileMenuOpen: () => void;
};

type Crumb = { label: string; href?: string; muted?: boolean };

function useCrumbs(): Crumb[] {
  const pathname = usePathname();
  const { filters } = useCatalogFilters();

  if (pathname === "/about") return [{ label: "About" }];

  if (pathname.startsWith("/song/")) {
    const track = getTrack(pathname.slice("/song/".length));
    if (!track) return [{ label: "Song" }];
    const group = getGroup(track.groupId);
    return [
      ...(group
        ? [{ label: group.name, href: catalogHref({ search: "", groupId: group.id, tags: [] }) }]
        : []),
      { label: track.title },
    ];
  }

  // Catalog
  const group = filters.groupId === "all" ? undefined : getGroup(filters.groupId);
  const crumbs: Crumb[] = [
    group
      ? { label: group.name, href: catalogHref({ search: "", groupId: group.id, tags: [] }) }
      : { label: "All songs", href: "/" },
  ];
  const refinements: string[] = [];
  if (filters.tags.length > 0) refinements.push(filters.tags.join(", "));
  if (filters.search.trim()) refinements.push(`\u201c${filters.search.trim()}\u201d`);
  if (refinements.length > 0) crumbs.push({ label: refinements.join(" · "), muted: true });
  return crumbs;
}

function Breadcrumbs() {
  const crumbs = useCrumbs();
  const lastIndex = crumbs.length - 1;
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
      <Link
        scroll={false}
        href="/"
        className="flex-shrink-0 text-sm font-semibold tracking-widest text-white/70 uppercase hover:text-white"
      >
        AC Music
      </Link>
      {crumbs.map((crumb, i) => {
        const isLast = i === lastIndex;
        const className = `truncate ${
          crumb.muted
            ? "text-white/35 italic"
            : isLast
            ? "text-white"
            : "text-white/50 hover:text-white"
        } ${isLast ? "" : "hidden sm:inline"}`;
        return (
          <span key={`${crumb.label}-${i}`} className={`flex min-w-0 items-center gap-1.5 ${isLast ? "" : "hidden sm:flex"}`}>
            <ChevronRight className="size-3.5 flex-shrink-0 text-white/25" aria-hidden />
            {crumb.href && !isLast ? (
              <Link scroll={false} href={crumb.href} className={className}>
                {crumb.label}
              </Link>
            ) : (
              <span className={className} aria-current={isLast ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default function TopBar({ onMobileMenuOpen }: TopBarProps) {
  const { filters, isCatalog, hasActiveFilters, clear } = useCatalogFilters();
  const playQueue = usePlayerStore((s) => s.playQueue);

  // "Play all" respects the current catalog filters; on other pages it means
  // the whole catalog.
  const scopedTracks = () => {
    if (!isCatalog || !hasActiveFilters) return orderedTracks;
    const filtered = filterTracks(tracks, groups, filters);
    return sortedGroups.flatMap((g) =>
      sortTracks(filtered.filter((t) => t.groupId === g.id)),
    );
  };

  const scopeLabel = isCatalog && hasActiveFilters ? "Play these" : "Play all";

  return (
    <div className="flex-shrink-0 border-b border-white/[0.07] bg-zinc-950">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-white/60 hover:text-white md:hidden"
          onClick={onMobileMenuOpen}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        {hasActiveFilters && isCatalog && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-white/40 hover:text-white"
            onClick={clear}
          >
            <RotateCcw className="size-3" />
            Reset filters
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-white/60 hover:text-white"
          onClick={() => playQueue(scopedTracks(), 0)}
        >
          <Play className="size-3.5" />
          {scopeLabel}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-white/60 hover:text-white"
          onClick={() => playQueue(shuffleArray(scopedTracks()), 0)}
          aria-label="Shuffle"
        >
          <Shuffle className="size-3.5" />
          <span className="hidden sm:inline">Shuffle</span>
        </Button>
      </div>
    </div>
  );
}
