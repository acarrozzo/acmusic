"use client";

import Image from "next/image";
import type { Group } from "@/data/groups";
import type { Track } from "@/data/tracks";
import { Button } from "@/components/ui/button";
import TrackCard from "./TrackCard";

type GroupSectionProps = {
  group: Group;
  tracks: Track[];
  onPlayGroup: (groupId: string, shuffle: boolean) => void;
  onPlayTrack: (track: Track, context: Track[]) => void;
  onQueueTrack: (track: Track) => void;
};

export default function GroupSection({
  group,
  tracks,
  onPlayGroup,
  onPlayTrack,
  onQueueTrack,
}: GroupSectionProps) {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div
        className="flex flex-col gap-4 border-b border-white/10 pb-6 pl-4"
        style={{
          borderLeft: "2px solid",
          borderLeftColor: group.brand?.accent ?? "rgba(255,255,255,0.2)",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="h-[160px] w-[160px] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={tracks[0].artwork.src}
                alt={tracks[0].artwork.alt ?? `${group.name} artwork`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                {group.brand?.markText ?? group.name.slice(0, 2)}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {group.name}
              </h2>
              {group.tagline ? (
                <p className="mt-1 text-sm text-white/70">{group.tagline}</p>
              ) : null}
              {group.description ? (
                <p className="mt-3 max-w-2xl text-sm text-white/60">
                  {group.description}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => onPlayGroup(group.id, false)}>
              Play Album
            </Button>
            <Button variant="secondary" onClick={() => onPlayGroup(group.id, true)}>
              Shuffle Album
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onPlay={(selected) => onPlayTrack(selected, tracks)}
            onQueue={onQueueTrack}
          />
        ))}
      </div>
    </section>
  );
}
