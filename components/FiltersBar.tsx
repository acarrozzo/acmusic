"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Group } from "@/data/groups";

type FiltersBarProps = {
  groups: Group[];
  allTags: string[];
  groupCounts: Record<string, number>;
  tagCounts: Record<string, number>;
  search: string;
  groupId: string | "all";
  selectedTags: string[];
  onSearchChange: (value: string) => void;
  onGroupChange: (value: string | "all") => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
};

export default function FiltersBar({
  groups,
  allTags,
  groupCounts,
  tagCounts,
  search,
  groupId,
  selectedTags,
  onSearchChange,
  onGroupChange,
  onTagToggle,
  onClearFilters,
}: FiltersBarProps) {
  const [tagsOpen, setTagsOpen] = useState(false);
  const tagsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tagsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!tagsRef.current || !target || tagsRef.current.contains(target)) {
        return;
      }
      setTagsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTagsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tagsOpen]);

  return (
    <section className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Songs
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={groupId === "all" ? "default" : "outline"}
                onClick={() => onGroupChange("all")}
              >
                All
                <span
                  className={`ml-0 ${
                    groupId === "all" ? "text-black/60" : "text-white/40"
                  }`}
                >
                  {groupCounts.all ?? 0}
                </span>
              </Button>
              {groups.map((group) => (
                <Button
                  key={group.id}
                  variant={groupId === group.id ? "default" : "outline"}
                  onClick={() => onGroupChange(group.id)}
                >
                  {group.name}
                  <span
                    className={`ml-0 ${
                      groupId === group.id ? "text-black/60" : "text-white/40"
                    }`}
                  >
                    {groupCounts[group.id] ?? 0}
                  </span>
                </Button>
              ))}
            </div>
            <div className="relative" ref={tagsRef}>
              <Button
                variant="outline"
                className="whitespace-nowrap"
                aria-expanded={tagsOpen}
                aria-haspopup="dialog"
                onClick={() => setTagsOpen((open) => !open)}
              >
                <Filter className="mr-2 size-4" />
                Tags
              </Button>
              {tagsOpen ? (
                <div className="absolute right-0 top-full z-30 mt-2 w-[min(360px,85vw)] rounded-lg border border-white/10 bg-black/95 p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      Tags
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto px-2 py-1 text-xs text-white/60 hover:text-white"
                      onClick={() => setTagsOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <Button
                          key={tag}
                          variant={active ? "default" : "outline"}
                          size="sm"
                          onClick={() => onTagToggle(tag)}
                        >
                        {tag}
                          <span
                            className={`ml-0 ${
                              active ? "text-black/60" : "text-white/40"
                            }`}
                          >
                          {tagCounts[tag] ?? 0}
                        </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search songs, tags, groups..."
              className="w-full max-w-xs bg-white/5 text-white placeholder:text-white/40"
            />
            <Button
              variant="secondary"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
