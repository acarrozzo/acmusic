"use client";

import { useEffect, useRef, useState } from "react";
import { Filter, Play, Shuffle, Users, X } from "lucide-react";
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
  onPlayAll: () => void;
  onShuffleAll: () => void;
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
  onPlayAll,
  onShuffleAll,
}: FiltersBarProps) {
  const [tagsOpen, setTagsOpen] = useState(false);
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const [groupsOpen, setGroupsOpen] = useState(false);
  const groupsRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!groupsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!groupsRef.current || !target || groupsRef.current.contains(target)) {
        return;
      }
      setGroupsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGroupsOpen(false);
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
  }, [groupsOpen]);

  return (
    <section className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Songs
            </p>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={onPlayAll}
            >
              <Play className="mr-1.5 size-3.5" />
              Play All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={onShuffleAll}
            >
              <Shuffle className="mr-1.5 size-3.5" />
              Shuffle
            </Button>
            <div className="relative" ref={groupsRef}>
              <Button
                variant="outline"
                className="whitespace-nowrap"
                aria-expanded={groupsOpen}
                aria-haspopup="dialog"
                onClick={() => setGroupsOpen((open) => !open)}
              >
                <Users className="mr-2 size-4" />
                Show
                <span className="ml-2 text-white/60">
                  {groupId === "all"
                    ? "All"
                    : groups.find((g) => g.id === groupId)?.name}
                </span>
              </Button>
              {groupsOpen ? (
                <div className="absolute left-0 top-full z-30 mt-2 w-[min(360px,85vw)] rounded-lg border border-white/10 bg-black/95 p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      Groups
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto px-2 py-1 text-xs text-white/60 hover:text-white"
                      onClick={() => setGroupsOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={groupId === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        onGroupChange("all");
                        setGroupsOpen(false);
                      }}
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
                        size="sm"
                        onClick={() => {
                          onGroupChange(group.id);
                          setGroupsOpen(false);
                        }}
                      >
                        {group.name}
                        <span
                          className={`ml-0 ${
                            groupId === group.id
                              ? "text-black/60"
                              : "text-white/40"
                          }`}
                        >
                          {groupCounts[group.id] ?? 0}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}
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
                {selectedTags.length > 0 && (
                  <span className="ml-1 text-white/60">{selectedTags.length}</span>
                )}
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
              placeholder="Search..."
              className="min-w-0 flex-1 basis-36 bg-white/5 text-white sm:max-w-xs placeholder:text-white/40"
            />
            <Button
              variant="secondary"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              Reset
            </Button>
          </div>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Tags
              </p>
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white transition hover:border-white/40 hover:bg-white/20"
                >
                  {tag}
                  <X className="size-3 text-white/50" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
