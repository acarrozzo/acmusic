"use client";

import type { Track } from "@/data/tracks";

type ComparePlayerProps = {
  track: Track;
};

export default function ComparePlayer({ track }: ComparePlayerProps) {
  if (!track.audio.originalUrl) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <p className="text-sm text-white/80">Suno cover</p>
        <audio className="mt-3 w-full" controls preload="metadata">
          <source src={track.audio.sunoCoverUrl} />
        </audio>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <p className="text-sm text-white/80">
          Original
          {track.originalRef?.year ? ` (${track.originalRef.year})` : ""}
        </p>
        {track.originalRef?.description ? (
          <p className="mt-2 text-xs text-white/60">
            {track.originalRef.description}
          </p>
        ) : null}
        <audio className="mt-3 w-full" controls preload="metadata">
          <source src={track.audio.originalUrl} />
        </audio>
      </div>
    </div>
  );
}
