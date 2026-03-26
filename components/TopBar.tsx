"use client";

import { Disc3, LayoutList, Menu, Play, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

type TopBarProps = {
  hasActiveFilters: boolean;
  contentMode: "list" | "song";
  onPlayAll: () => void;
  onShuffleAll: () => void;
  onClearFilters: () => void;
  onContentModeChange: (mode: "list" | "song") => void;
  onMobileMenuOpen: () => void;
};

export default function TopBar({
  hasActiveFilters,
  contentMode,
  onPlayAll,
  onShuffleAll,
  onClearFilters,
  onContentModeChange,
  onMobileMenuOpen,
}: TopBarProps) {
  return (
    <div className="flex-shrink-0 border-b border-white/[0.07] bg-zinc-950">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-white/60 hover:text-white md:hidden"
          onClick={onMobileMenuOpen}
        >
          <Menu className="size-5" />
        </Button>

        {/* Branding */}
        <p className="flex-shrink-0 text-sm font-semibold tracking-widest text-white/70 uppercase">
          AC Music
        </p>

        <div className="flex-1" />

        {/* List / Song toggle — centered */}
        <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => onContentModeChange("list")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              contentMode === "list"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            <LayoutList className="size-3.5" />
            List
          </button>
          <button
            type="button"
            onClick={() => onContentModeChange("song")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              contentMode === "song"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Disc3 className="size-3.5" />
            Song
          </button>
        </div>

        <div className="flex-1" />

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
        {hasActiveFilters && contentMode === "list" && (
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
