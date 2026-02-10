"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Track } from "@/data/tracks";
import { ChevronDown, ChevronUp, ListPlus, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function TrackCard({ track, onPlay, onQueue }: TrackCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOriginal = Boolean(track.audio.originalUrl);
  const isNew = useMemo(() => isNewRelease(track.releaseDate), [track.releaseDate]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
          <Button onClick={() => onPlay(track)}>
            <Play className="mr-1.5 size-4" />
            Play
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
