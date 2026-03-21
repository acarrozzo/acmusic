"use client";

import { Play, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Group } from "@/data/groups";

type TopBarProps = {
  search: string;
  activeGroup: Group | null;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onPlayAll: () => void;
  onShuffleAll: () => void;
  onClearFilters: () => void;
};

export default function TopBar({
  search,
  activeGroup,
  hasActiveFilters,
  onSearchChange,
  onPlayAll,
  onShuffleAll,
  onClearFilters,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Active group indicator */}
        {activeGroup ? (
          <span
            className="flex-shrink-0 text-sm font-medium"
            style={{ color: activeGroup.brand?.accent ?? "rgba(255,255,255,0.8)" }}
          >
            {activeGroup.name}
          </span>
        ) : (
          <span className="flex-shrink-0 text-sm font-medium text-white/50">
            All Songs
          </span>
        )}

        <div className="flex-1" />

        {/* Search */}
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="h-8 w-40 bg-white/5 text-sm text-white placeholder:text-white/30"
        />

        {/* Play all */}
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-white/60 hover:text-white" onClick={onPlayAll}>
          <Play className="size-3.5" />
          Play
        </Button>

        {/* Shuffle */}
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-white/60 hover:text-white" onClick={onShuffleAll}>
          <Shuffle className="size-3.5" />
        </Button>

        {/* Reset filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-white/40 hover:text-white"
            onClick={onClearFilters}
          >
            <RotateCcw className="size-3" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
