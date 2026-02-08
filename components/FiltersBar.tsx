"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Group } from "@/data/groups";
import type { SortOption } from "@/lib/filters";

type FiltersBarProps = {
  groups: Group[];
  allTags: string[];
  search: string;
  groupId: string | "all";
  selectedTags: string[];
  sort: SortOption;
  onSearchChange: (value: string) => void;
  onGroupChange: (value: string | "all") => void;
  onTagToggle: (tag: string) => void;
  onSortChange: (value: SortOption) => void;
  onClearFilters: () => void;
};

const sortLabels: Record<SortOption, string> = {
  group: "Group order",
  newest: "Newest",
  az: "A-Z",
};

export default function FiltersBar({
  groups,
  allTags,
  search,
  groupId,
  selectedTags,
  sort,
  onSearchChange,
  onGroupChange,
  onTagToggle,
  onSortChange,
  onClearFilters,
}: FiltersBarProps) {
  return (
    <section className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-lg items-center gap-3">
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search songs, tags, groups..."
              className="bg-white/5 text-white placeholder:text-white/40"
            />
            <Button
              variant="secondary"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              Reset
            </Button>
          </div>
          <div className="w-full max-w-[200px]">
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="bg-white/5 text-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sortLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Groups
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={groupId === "all" ? "default" : "outline"}
              onClick={() => onGroupChange("all")}
            >
              All
            </Button>
            {groups.map((group) => (
              <Button
                key={group.id}
                variant={groupId === group.id ? "default" : "outline"}
                onClick={() => onGroupChange(group.id)}
              >
                {group.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Tags
          </p>
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
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
