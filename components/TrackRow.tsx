"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ChevronRight, GitCompare, ListPlus, Music, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Track } from "@/data/tracks";
import { isPlaceholderTrack } from "@/data/tracks";
import { songHref } from "@/lib/catalog";
import { usePlayerStore } from "@/lib/player/store";
import { useUi } from "@/lib/ui";
import { formatTime } from "@/lib/utils";

type TrackRowProps = {
  track: Track;
  onPlay: (track: Track) => void;
  onQueue: (track: Track) => void;
  /** Album rows: show the track number where the artwork would be. */
  numbered?: boolean;
};

/**
 * A catalog row. Clicking the row opens the song in the side panel; the play
 * button plays. The Compare badge deep-links to the full page, since the
 * panel doesn't host the version players.
 */
export default function TrackRow({ track, onPlay, onQueue, numbered = false }: TrackRowProps) {
  const openTrack = useUi((s) => s.openTrack);
  const panelOpen = useUi((s) => s.panelOpen);
  const panelMode = useUi((s) => s.panelMode);
  const panelTrackId = useUi((s) => s.panelTrackId);
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const currentTrack = useMemo(() => queue[currentIndex] ?? null, [queue, currentIndex]);
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlaceholder = isPlaceholderTrack(track);
  const isPlayingTrack = isActiveTrack && isPlaying;
  const isSelected =
    panelOpen && panelMode === "selected" && panelTrackId === track.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActiveTrack) togglePlay();
    else onPlay(track);
  };

  const handleQueueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQueue(track);
  };

  const open = () => openTrack(track.id);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`Show details for ${track.title}`}
      aria-pressed={isSelected}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 ${
        numbered ? "py-1.5" : "py-2.5"
      } transition outline-none focus-visible:ring-1 focus-visible:ring-white/30 ${
        isActiveTrack
          ? "bg-white/10"
          : isSelected
          ? "bg-white/5 ring-1 ring-white/15"
          : "hover:bg-white/5"
      }`}
    >
      <Button
        size="icon"
        variant="ghost"
        className="size-8 flex-shrink-0 text-white/50 hover:text-white"
        onClick={handlePlayClick}
        aria-label={isPlayingTrack ? `Pause ${track.title}` : `Play ${track.title}`}
      >
        {isPlayingTrack ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>

      {numbered ? (
        <span className="w-6 flex-shrink-0 text-right text-xs tabular-nums text-white/30">
          {track.trackNumber}
        </span>
      ) : (
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-white/10">
          <Image
            src={track.artwork.src}
            alt={track.artwork.alt ?? track.title}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            isActiveTrack
              ? "text-emerald-300"
              : isPlaceholder
              ? "text-white/30"
              : "text-white"
          }`}
        >
          {track.title}
        </p>
        {numbered ? null : (
          <p className={`truncate text-xs italic ${isPlaceholder ? "text-white/20" : "text-white/40"}`}>
            {track.description}
          </p>
        )}
      </div>

      {/* Badges: Lyrics opens the panel, Compare deep-links to the page */}
      <div className="hidden items-center gap-1 md:flex">
        {track.lyrics ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/50">
            <Music className="size-2.5" />
            Lyrics
          </span>
        ) : null}
        {track.audio.originalUrl ? (
          <Link
            scroll={false}
            href={songHref(track.id, "compare")}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/50 transition hover:border-white/40 hover:text-white"
          >
            <GitCompare className="size-2.5" />
            Compare
          </Link>
        ) : null}
      </div>

      <div className="flex flex-shrink-0 items-center gap-1">
        {track.duration ? (
          <span className="mr-1 text-xs tabular-nums text-white/30">
            {formatTime(track.duration)}
          </span>
        ) : null}
        <Button
          size="icon"
          variant="ghost"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          onClick={handleQueueClick}
          aria-label={`Add ${track.title} to queue`}
        >
          <ListPlus className="size-3.5" />
        </Button>
        <ChevronRight className="size-4 text-white/20 transition group-hover:text-white/60" />
      </div>
    </div>
  );
}
