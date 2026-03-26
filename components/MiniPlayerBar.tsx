"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/lib/player/store";
import FullPlayer from "./FullPlayer";

export default function MiniPlayerBar() {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);

  const [fullPlayerOpen, setFullPlayerOpen] = useState(false);

  const currentTrack = useMemo(
    () => queue[currentIndex] ?? null,
    [queue, currentIndex],
  );

  // Spacebar play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (queue.length === 0) return;
      e.preventDefault();
      togglePlay();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [queue.length, togglePlay]);

  if (!currentTrack) {
    return (
      <div className="flex h-14 flex-shrink-0 items-center border-t border-white/10 bg-zinc-900/95 px-6 text-xs text-white/30">
        Pick a song — any of them are a good start.
      </div>
    );
  }

  return (
    <>
      <div className="flex h-14 flex-shrink-0 items-center gap-3 border-t border-white/10 bg-zinc-900/95 px-4 backdrop-blur">
        {/* Track info — click opens full player */}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-3"
          onClick={() => setFullPlayerOpen(true)}
        >
          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded bg-white/10">
            <Image
              src={currentTrack.artwork.src}
              alt={currentTrack.artwork.alt ?? currentTrack.title}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm text-white">{currentTrack.title}</p>
            <p className="truncate text-xs text-white/40 italic">
              {currentTrack.description}
            </p>
          </div>
        </button>

        {/* Progress bar — center, hidden on small screens */}
        <div className="hidden w-48 flex-shrink-0 sm:block lg:w-64">
          <Slider
            value={[Math.min(currentTime, duration || 0)]}
            max={duration || 1}
            step={1}
            onValueChange={(v) => setCurrentTime(v[0] ?? 0)}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/60 hover:text-white"
            onClick={prev}
          >
            <SkipBack className="size-4" />
          </Button>
          <Button
            size="icon"
            className="size-8"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/60 hover:text-white"
            onClick={next}
          >
            <SkipForward className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/40 hover:text-white"
            onClick={() => setFullPlayerOpen(true)}
          >
            <ChevronUp className="size-4" />
          </Button>
        </div>
      </div>

      <FullPlayer open={fullPlayerOpen} onClose={() => setFullPlayerOpen(false)} />
    </>
  );
}
