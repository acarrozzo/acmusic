"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { sortedGroups } from "@/lib/catalog";
import { useCatalogFilters } from "@/lib/useCatalogFilters";

type SidebarProps = {
  groupCounts: Record<string, number>;
  allTags: string[];
  tagCounts: Record<string, number>;
  /** Rail mode. Omit for the mobile drawer, which is always expanded. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

export default function Sidebar({
  groupCounts,
  allTags,
  tagCounts,
  collapsed = false,
  onCollapsedChange,
}: SidebarProps) {
  const pathname = usePathname();
  const { filters, isCatalog, setSearch, setGroup, toggleTag } =
    useCatalogFilters();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const focusSearchOnExpand = useRef(false);

  // Keep the input responsive while the URL update is debounced. When the
  // URL changes for a reason other than our own typing (Reset, Back button),
  // adopt that value.
  const [draft, setDraft] = useState(filters.search);
  const [prevSearch, setPrevSearch] = useState(filters.search);
  const [lastPushed, setLastPushed] = useState(filters.search);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (filters.search !== prevSearch) {
    setPrevSearch(filters.search);
    if (filters.search !== lastPushed) setDraft(filters.search);
  }
  useEffect(() => {
    const pending = timer;
    return () => {
      if (pending.current) clearTimeout(pending.current);
    };
  }, []);
  useEffect(() => {
    if (!collapsed && focusSearchOnExpand.current) {
      focusSearchOnExpand.current = false;
      searchRef.current?.focus();
    }
  }, [collapsed]);

  const handleSearchChange = (value: string) => {
    setDraft(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLastPushed(value.trim());
      setSearch(value);
    }, 200);
  };

  const isAllActive = isCatalog && filters.groupId === "all";
  const isAbout = pathname === "/about";
  const canCollapse = Boolean(onCollapsedChange);

  /* ---------------------------------------------------------------- rail */
  if (collapsed) {
    return (
      <div className="flex h-full w-14 flex-col items-center border-r border-white/[0.07] bg-zinc-950 py-3">
        <button
          type="button"
          onClick={() => onCollapsedChange?.(false)}
          title="Expand navigation"
          aria-label="Expand navigation"
          className="flex size-9 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          <PanelLeftOpen className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            focusSearchOnExpand.current = true;
            onCollapsedChange?.(false);
          }}
          title="Search songs"
          aria-label="Search songs"
          className={`mt-1 flex size-9 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white ${
            filters.search ? "text-white" : "text-white/40"
          }`}
        >
          <Search className="size-4" />
        </button>

        <nav aria-label="Projects" className="mt-3 flex flex-col items-center gap-1 border-t border-white/[0.07] pt-3">
          <button
            type="button"
            onClick={() => setGroup("all")}
            title={`All songs (${groupCounts.all ?? 0})`}
            aria-label="All songs"
            aria-current={isAllActive ? "page" : undefined}
            className={`flex size-9 items-center justify-center rounded-lg text-[10px] font-semibold tracking-wider transition hover:bg-white/5 ${
              isAllActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            ALL
          </button>
          {sortedGroups.map((group) => {
            const isActive = isCatalog && filters.groupId === group.id;
            const accent = group.brand?.accent ?? "rgba(255,255,255,0.7)";
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setGroup(group.id)}
                title={`${group.name} (${groupCounts[group.id] ?? 0})`}
                aria-label={group.name}
                aria-current={isActive ? "page" : undefined}
                className={`flex size-9 items-center justify-center rounded-lg transition hover:bg-white/5 ${
                  isActive ? "bg-white/10" : ""
                }`}
              >
                <span
                  className="size-2.5 rounded-full transition-transform"
                  style={{
                    backgroundColor: isActive ? accent : "rgba(255,255,255,0.25)",
                    boxShadow: isActive ? `0 0 0 3px ${accent}33` : undefined,
                  }}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        <Link
          scroll={false}
          href={isAbout ? "/" : "/about"}
          title="About"
          aria-label="About"
          aria-current={isAbout ? "page" : undefined}
          className={`flex size-9 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white ${
            isAbout ? "text-white" : "text-white/40"
          }`}
        >
          <Info className="size-4" />
        </Link>
      </div>
    );
  }

  /* ------------------------------------------------------------ expanded */
  return (
    <div className="flex h-full w-64 flex-col border-r border-white/[0.07] bg-zinc-950">
      {/* Branding */}
      <div className="flex flex-shrink-0 items-start justify-between px-5 pt-5 pb-4">
        <div>
          <Link scroll={false} href="/" className="text-xs uppercase tracking-[0.25em] text-white/50 hover:text-white">
            AC Music
          </Link>
          <p className="mt-1.5 max-w-[180px] text-xs leading-relaxed text-white/25">
            Thirty years of songs, finally heard.
          </p>
        </div>
        {canCollapse ? (
          <button
            type="button"
            onClick={() => onCollapsedChange?.(true)}
            title="Collapse navigation"
            aria-label="Collapse navigation"
            className="-mr-2 -mt-1 flex size-8 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/5 hover:text-white"
          >
            <PanelLeftClose className="size-4" />
          </button>
        ) : null}
      </div>

      {/* Everything below the brand scrolls as one region */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Search */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Search className="size-3.5 flex-shrink-0 text-white/30" />
            <input
              ref={searchRef}
              type="text"
              value={draft}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search songs..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
          </div>
        </div>

        {/* Project nav */}
        <nav className="px-3">
          <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
            Projects
          </p>
          <button
            type="button"
            onClick={() => setGroup("all")}
            className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${
              isAllActive
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            }`}
          >
            <span
              className="size-2 flex-shrink-0 rounded-full"
              style={{
                backgroundColor: isAllActive
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
            <span className="flex-1 text-left">All Songs</span>
            <span className="text-xs text-white/30">{groupCounts.all ?? 0}</span>
          </button>

          {sortedGroups.map((group) => {
            const isActive = isCatalog && filters.groupId === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setGroup(group.id)}
                className={`flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <span
                  className="mt-1.5 size-2 flex-shrink-0 rounded-full transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? (group.brand?.accent ?? "rgba(255,255,255,0.7)")
                      : "rgba(255,255,255,0.2)",
                  }}
                />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate">{group.name}</span>
                  {group.tagline ? (
                    <span className="block truncate text-[11px] leading-tight text-white/30">
                      {group.tagline}
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 text-xs text-white/30">
                  {groupCounts[group.id] ?? 0}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="mt-5 px-3 pb-4">
            <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => {
                const isActive = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-2.5 py-0.5 text-xs transition ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/40 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {tag}{" "}
                    <span className="opacity-60">{tagCounts[tag] ?? 0}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-white/[0.07] px-3 py-4">
        <Link
          scroll={false}
          href={isAbout ? "/" : "/about"}
          className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm transition ${
            isAbout ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {isAbout ? "← Back to Music" : "About"}
        </Link>
      </div>
    </div>
  );
}
