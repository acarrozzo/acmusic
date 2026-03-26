"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/lib/player/store";
import QueueDrawer from "./QueueDrawer";

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function BottomPlayer() {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const shuffle = usePlayerStore((s) => s.shuffle);
  const repeat = usePlayerStore((s) => s.repeat);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const volume = usePlayerStore((s) => s.volume);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const setShuffle = usePlayerStore((s) => s.setShuffle);
  const setRepeat = usePlayerStore((s) => s.setRepeat);
  const setVolume = usePlayerStore((s) => s.setVolume);

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
      <div className="flex h-16 flex-shrink-0 items-center border-t border-white/[0.07] bg-zinc-950 px-6 text-xs text-white/30">
        Pick a song — any of them are a good start.
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-zinc-950 px-4 py-3">
      <div className="flex items-center gap-4">

        {/* Left: artwork + track info */}
        <div className="flex w-56 flex-shrink-0 items-center gap-3 lg:w-72">
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white/10">
            <Image
              src={currentTrack.artwork.src}
              alt={currentTrack.artwork.alt ?? currentTrack.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {currentTrack.title}
            </p>
            <p className="truncate text-xs italic text-white/50">
              {currentTrack.description}
            </p>
          </div>
        </div>

        {/* Center: controls + progress */}
        <div className="flex flex-1 flex-col items-center gap-2">
          {/* Playback controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`size-9 ${shuffle ? "text-white" : "text-white/30"} hover:text-white`}
              onClick={() => setShuffle(!shuffle)}
            >
              <Shuffle className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 text-white/70 hover:text-white"
              onClick={prev}
            >
              <SkipBack className="size-5" />
            </Button>
            <Button
              size="icon"
              className="size-12 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="size-6" />
              ) : (
                <Play className="size-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 text-white/70 hover:text-white"
              onClick={next}
            >
              <SkipForward className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`size-9 ${repeat !== "off" ? "text-white" : "text-white/30"} hover:text-white`}
              onClick={() =>
                setRepeat(
                  repeat === "off" ? "all" : repeat === "all" ? "one" : "off",
                )
              }
            >
              {repeat === "one" ? (
                <Repeat1 className="size-4" />
              ) : (
                <Repeat className="size-4" />
              )}
            </Button>
          </div>

          {/* Progress */}
          <div className="flex w-full items-center gap-2 text-xs text-white/40">
            <span className="w-8 text-right tabular-nums">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[Math.min(currentTime, duration || 0)]}
              max={duration || 1}
              step={1}
              onValueChange={(v) => setCurrentTime(v[0] ?? 0)}
              className="flex-1"
            />
            <span className="w-8 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: volume + queue */}
        <div className="flex w-40 flex-shrink-0 items-center justify-end gap-2 lg:w-56">
          <Volume2 className="size-4 flex-shrink-0 text-white/30" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={(v) => setVolume(v[0] ?? 0.8)}
            className="w-24 lg:w-32"
          />
          <QueueDrawer />
        </div>

      </div>
    </div>
  );
}
