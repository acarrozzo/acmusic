"use client";

import { ListPlus, Play } from "lucide-react";
import type { Group } from "@/data/groups";
import type { Track } from "@/data/tracks";
import { Button } from "@/components/ui/button";
import TrackRow from "./TrackRow";

type GroupSectionProps = {
  group: Group;
  tracks: Track[];
  selectedTrack: Track | null;
  onPlayGroup: (groupId: string, shuffle: boolean) => void;
  onPlayTrack: (track: Track, context: Track[]) => void;
  onQueueTrack: (track: Track) => void;
  onQueueGroup: (tracks: Track[]) => void;
  onSelectTrack: (track: Track) => void;
};

export default function GroupSection({
  group,
  tracks,
  selectedTrack,
  onPlayGroup,
  onPlayTrack,
  onQueueTrack,
  onQueueGroup,
  onSelectTrack,
}: GroupSectionProps) {
  if (tracks.length === 0) {
    return null;
  }

  const accent = group.brand?.accent ?? "rgba(255,255,255,0.2)";

  return (
    <section id={group.id} className="mb-6">
      {/* Compact group header */}
      <div
        className="mb-1 flex items-center justify-between py-3 pl-4 pr-3"
        style={{ borderLeft: `3px solid ${accent}` }}
      >
        <div className="pl-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            {group.brand?.markText ?? group.name.slice(0, 2)}
          </p>
          <h2 className="text-base font-semibold text-white">{group.name}</h2>
          {group.tagline ? (
            <p className="text-xs text-white/40">{group.tagline}</p>
          ) : null}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs text-white/60 hover:text-white"
            onClick={() => onPlayGroup(group.id, false)}
          >
            <Play className="size-3" />
            Play
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 text-white/60 hover:text-white"
            onClick={() => onQueueGroup(tracks)}
          >
            <ListPlus className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Track rows */}
      <div className="flex flex-col">
        {tracks.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            groupAccent={accent}
            isSelected={selectedTrack?.id === track.id}
            onPlay={(t) => onPlayTrack(t, tracks)}
            onQueue={onQueueTrack}
            onSelect={onSelectTrack}
          />
        ))}
      </div>
    </section>
  );
}
