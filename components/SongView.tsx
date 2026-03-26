"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/lib/player/store";
import ComparePlayer from "./ComparePlayer";

export default function SongView() {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const currentTrack = useMemo(
    () => queue[currentIndex] ?? null,
    [queue, currentIndex],
  );

  if (!currentTrack) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <p className="text-sm italic text-white/30">
          Pick a song from the list — then come back here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">

        {/* Left column: art + meta + compare */}
        <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
          {/* Album art */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/10 shadow-2xl">
            <Image
              src={currentTrack.artwork.src}
              alt={currentTrack.artwork.alt ?? currentTrack.title}
              fill
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Track info */}
          <div className="mt-6">
            <h1 className="text-2xl font-semibold leading-tight text-white">
              {currentTrack.title}
            </h1>
            <p className="mt-2 text-sm italic text-white/50">
              {currentTrack.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {currentTrack.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-5">
              <Button onClick={togglePlay} size="lg" className="gap-2">
                {isPlaying ? (
                  <>
                    <Pause className="size-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="size-4" />
                    Play
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Compare versions — smaller, tucked below */}
          {currentTrack.audio.originalUrl ? (
            <div className="mt-8 border-t border-white/[0.07] pt-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Compare Versions
              </p>
              <ComparePlayer track={currentTrack} />
            </div>
          ) : null}
        </div>

        {/* Right column: lyrics */}
        <div className="flex-1 min-w-0">
          {currentTrack.lyrics ? (
            <>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Lyrics
              </p>
              <p className="whitespace-pre-line text-lg leading-loose text-white/85">
                {currentTrack.lyrics.text}
              </p>
            </>
          ) : (
            <div className="flex h-40 items-center justify-center lg:h-full lg:min-h-[200px]">
              <p className="text-sm italic text-white/25">No lyrics available</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
