"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  ChevronDown,
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
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { usePlayerStore } from "@/lib/player/store";
import QueueDrawer from "./QueueDrawer";

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

type FullPlayerProps = {
  open: boolean;
  onClose: () => void;
};

export default function FullPlayer({ open, onClose }: FullPlayerProps) {
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

  if (!currentTrack) return null;

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent
        side="bottom"
        className="h-full border-white/10 bg-black p-0 [&>button]:hidden"
      >
        <div className="mx-auto flex h-full max-w-md flex-col px-6 pb-safe">
          {/* Drag handle / close */}
          <div className="flex flex-shrink-0 justify-center pt-4 pb-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-white/30 hover:text-white"
              onClick={onClose}
            >
              <ChevronDown className="size-5" />
            </Button>
          </div>

          {/* Artwork */}
          <div className="relative mx-auto aspect-square w-full max-h-[38vh] flex-shrink-0 overflow-hidden rounded-2xl bg-white/10">
            <Image
              src={currentTrack.artwork.src}
              alt={currentTrack.artwork.alt ?? currentTrack.title}
              fill
              sizes="400px"
              className="object-cover"
              priority
            />
          </div>

          {/* Track info + queue */}
          <div className="mt-5 flex flex-shrink-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-white truncate">
                {currentTrack.title}
              </h2>
              <p className="text-sm italic text-white/50 truncate mt-0.5">
                {currentTrack.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <QueueDrawer />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 flex-shrink-0">
            <Slider
              value={[Math.min(currentTime, duration || 0)]}
              max={duration || 1}
              step={1}
              onValueChange={(v) => setCurrentTime(v[0] ?? 0)}
            />
            <div className="mt-1.5 flex justify-between text-xs text-white/40">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-shrink-0 items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`size-10 ${shuffle ? "text-white" : "text-white/30"}`}
              onClick={() => setShuffle(!shuffle)}
            >
              <Shuffle className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-12 text-white/80 hover:text-white"
              onClick={prev}
            >
              <SkipBack className="size-6" />
            </Button>
            <Button
              size="icon"
              className="size-14 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="size-7" />
              ) : (
                <Play className="size-7" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-12 text-white/80 hover:text-white"
              onClick={next}
            >
              <SkipForward className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`size-10 ${repeat !== "off" ? "text-white" : "text-white/30"}`}
              onClick={() =>
                setRepeat(
                  repeat === "off" ? "all" : repeat === "all" ? "one" : "off",
                )
              }
            >
              {repeat === "one" ? (
                <Repeat1 className="size-5" />
              ) : (
                <Repeat className="size-5" />
              )}
            </Button>
          </div>

          {/* Volume */}
          <div className="mt-4 flex flex-shrink-0 items-center gap-3">
            <Volume2 className="size-4 flex-shrink-0 text-white/30" />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(v) => setVolume(v[0] ?? 0.8)}
            />
          </div>

          {/* Lyrics — scrollable if available */}
          {currentTrack.lyrics ? (
            <div className="mt-5 min-h-0 flex-1 overflow-y-auto border-t border-white/10 pt-4">
              <p className="mb-3 flex-shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Lyrics
              </p>
              <p className="whitespace-pre-line pb-8 text-sm leading-loose text-white/65">
                {currentTrack.lyrics.text}
              </p>
            </div>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
