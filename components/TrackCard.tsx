"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Track } from "@/data/tracks";
import { ChevronDown, ChevronUp, ListPlus, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/lib/player/store";
import TrackExpand from "./TrackExpand";

type TrackCardProps = {
  track: Track;
  onPlay: (track: Track) => void;
  onQueue: (track: Track) => void;
};

const isNewRelease = (releaseDate?: string) => {
  if (!releaseDate) return false;
  const releaseTime = Date.parse(releaseDate);
  if (Number.isNaN(releaseTime)) return false;
  const ageMs = Date.now() - releaseTime;
  return ageMs < 1000 * 60 * 60 * 24 * 30;
};

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function TrackCard({ track, onPlay, onQueue }: TrackCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOriginal = Boolean(track.audio.originalUrl);
  const isNew = useMemo(() => isNewRelease(track.releaseDate), [track.releaseDate]);
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const currentTrack = useMemo(() => queue[currentIndex] ?? null, [queue, currentIndex]);
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlayingTrack = isActiveTrack && isPlaying;
  const handlePlayButtonClick = () => {
    if (isActiveTrack) {
      togglePlay();
      return;
    }
    onPlay(track);
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isPlayingTrack ? "border-emerald-300/70 bg-emerald-500/10" : "border-white/10 bg-white/5"
      }`}
    >
      {isActiveTrack ? (
        <div className="mb-4 border-b border-white/10 pb-4">
          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
            <span className="uppercase tracking-[0.2em]">
              {isPlayingTrack ? "Now Playing" : "Current Track"}
            </span>
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <Slider
            value={[Math.min(currentTime, duration || 0)]}
            max={duration || 1}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0] ?? 0)}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white/10">
          <Image
            src={track.artwork.src}
            alt={track.artwork.alt ?? track.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{track.title}</h3>
            {isPlayingTrack ? (
              <Badge variant="secondary" className="gap-1.5">
                <span className="size-2 rounded-full bg-emerald-300 animate-pulse" />
                Playing
              </Badge>
            ) : null}
            {hasOriginal ? <Badge variant="outline">Has Original</Badge> : null}
            {isNew ? <Badge variant="secondary">New</Badge> : null}
          </div>
          <p className="mt-2 text-sm text-white/70">{track.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {track.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handlePlayButtonClick}>
            {isPlayingTrack ? (
              <>
                <Pause className="mr-1.5 size-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-1.5 size-4" />
                Play
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={() => onQueue(track)}>
            <ListPlus className="mr-1.5 size-4" />
            Queue
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setExpanded((value) => !value)}>
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {expanded ? <TrackExpand track={track} /> : null}
    </div>
  );
}
