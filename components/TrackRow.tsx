"use client";

import Image from "next/image";
import { useMemo } from "react";
import { GitCompare, ListPlus, Music, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Track } from "@/data/tracks";
import { usePlayerStore } from "@/lib/player/store";

type TrackRowProps = {
  track: Track;
  groupAccent?: string;
  isSelected: boolean;
  onPlay: (track: Track) => void;
  onQueue: (track: Track) => void;
  onSelect: (track: Track) => void;
};

export default function TrackRow({
  track,
  groupAccent,
  isSelected,
  onPlay,
  onQueue,
  onSelect,
}: TrackRowProps) {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const currentTrack = useMemo(() => queue[currentIndex] ?? null, [queue, currentIndex]);
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlayingTrack = isActiveTrack && isPlaying;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActiveTrack) {
      togglePlay();
    } else {
      onPlay(track);
    }
  };

  const handleQueueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQueue(track);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(track)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(track)}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition outline-none focus-visible:ring-1 focus-visible:ring-white/30 ${
        isActiveTrack
          ? "bg-white/10"
          : isSelected
          ? "bg-white/5 ring-1 ring-white/15"
          : "hover:bg-white/5"
      }`}
    >
      {/* Playing indicator */}
      <div className="flex w-4 flex-shrink-0 items-center justify-center">
        {isPlayingTrack ? (
          <span
            className="size-2 animate-pulse rounded-full"
            style={{ backgroundColor: groupAccent ?? "#10b981" }}
          />
        ) : (
          <span className="size-1.5 rounded-full bg-white/20" />
        )}
      </div>

      {/* Artwork */}
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-white/10">
        <Image
          src={track.artwork.src}
          alt={track.artwork.alt ?? track.title}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      {/* Track info */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            isActiveTrack
              ? "text-emerald-300"
              : "text-white"
          }`}
        >
          {track.title}
        </p>
        <p className="truncate text-xs italic text-white/40">
          {track.description}
        </p>
      </div>

      {/* Badges — hidden on small screens */}
      <div className="hidden items-center gap-1 md:flex">
        {track.lyrics ? (
          <Badge variant="outline" className="gap-1 py-0 text-[10px]">
            <Music className="size-2.5" />
            Lyrics
          </Badge>
        ) : null}
        {track.audio.originalUrl ? (
          <Badge variant="outline" className="gap-1 py-0 text-[10px]">
            <GitCompare className="size-2.5" />
            Compare
          </Badge>
        ) : null}
      </div>

      {/* Hover actions */}
      <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          size="icon"
          variant="ghost"
          className="size-7"
          onClick={handlePlayClick}
        >
          {isPlayingTrack ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="size-7"
          onClick={handleQueueClick}
        >
          <ListPlus className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
