"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Track } from "@/data/tracks";
import { tracks } from "@/data/tracks";
import { groups } from "@/data/groups";
import { usePlayerStore } from "@/lib/player/store";

const FEATURED: Array<{ id: string; quote: string }> = [
  {
    id: "cr-suicide-booth",
    quote: "Hold my breath forever / If it meant that I could / Spend just another moment with you",
  },
  {
    id: "sa-she-knows",
    quote: "she wears the lead, she repels all evil... she lets me in",
  },
  {
    id: "ac-home",
    quote: "home is not a place, it's you",
  },
  {
    id: "sadam-complete-in-your-eyes",
    quote: "I see the universe and it's found in your eyes",
  },
];

type FeaturedCardProps = {
  track: Track;
  quote: string;
  onPlay: (track: Track) => void;
};

function FeaturedCard({ track, quote, onPlay }: FeaturedCardProps) {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const currentTrack = useMemo(() => queue[currentIndex] ?? null, [queue, currentIndex]);
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlayingTrack = isActiveTrack && isPlaying;

  const group = useMemo(() => groups.find((g) => g.id === track.groupId), [track.groupId]);

  const handlePlay = () => {
    if (isActiveTrack) togglePlay();
    else onPlay(track);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:border-white/20">
      {/* Square artwork with gradient bleed + quote */}
      <div className="relative aspect-square w-full max-h-[360px] shrink-0 overflow-hidden">
        <Image
          src={track.artwork.src}
          alt={track.artwork.alt ?? track.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-zinc-900" />

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="line-clamp-2 text-[10px] italic leading-relaxed text-white/70">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Card content: play button left, all text right */}
      <div className="flex items-start gap-2 px-3 pb-3 pt-2 sm:gap-3 sm:px-4 sm:pb-4 sm:pt-3">
        <Button
          size="icon"
          className="mt-0.5 size-8 shrink-0 rounded-full bg-white text-zinc-900 hover:bg-white/90"
          onClick={handlePlay}
        >
          {isPlayingTrack ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5 translate-x-px" />
          )}
        </Button>

        <div className="min-w-0 flex-1">
          {group && (
            <p className="mb-0.5 truncate text-[9px] uppercase tracking-widest text-white/35">
              {group.name}
            </p>
          )}
          <h3 className="truncate text-sm font-semibold text-white">{track.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs italic text-white/45">{track.description}</p>
          <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
            {track.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="py-0 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type FeaturedSectionProps = {
  onPlay: (track: Track) => void;
};

export default function FeaturedSection({ onPlay }: FeaturedSectionProps) {
  const featuredTracks = FEATURED.flatMap(({ id, quote }) => {
    const track = tracks.find((t) => t.id === id);
    return track ? [{ track, quote }] : [];
  });

  if (featuredTracks.length === 0) return null;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {featuredTracks.map(({ track, quote }) => (
        <FeaturedCard
          key={track.id}
          track={track}
          quote={quote}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}
