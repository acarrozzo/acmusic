"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
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

export default function PlayerBar() {
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shuffle = usePlayerStore((state) => state.shuffle);
  const repeat = usePlayerStore((state) => state.repeat);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const volume = usePlayerStore((state) => state.volume);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const next = usePlayerStore((state) => state.next);
  const prev = usePlayerStore((state) => state.prev);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setShuffle = usePlayerStore((state) => state.setShuffle);
  const setRepeat = usePlayerStore((state) => state.setRepeat);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const currentTrack = useMemo(
    () => queue[currentIndex] ?? null,
    [queue, currentIndex],
  );

  const repeatLabel =
    repeat === "off" ? "Repeat Off" : repeat === "one" ? "Repeat One" : "Repeat All";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      const target = event.target as HTMLElement | null;
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
      event.preventDefault();
      togglePlay();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [queue.length, togglePlay]);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 px-6 py-4 text-sm text-white/60">
        Select a track to start listening.
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/90 px-6 py-4 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/10">
              <Image
                src={currentTrack.artwork.src}
                alt={currentTrack.artwork.alt ?? currentTrack.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-white">{currentTrack.title}</p>
              <p className="text-xs text-white/60">{currentTrack.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <QueueDrawer />
            <Button variant="ghost" onClick={() => setShuffle(!shuffle)}>
              {shuffle ? "Shuffle On" : "Shuffle Off"}
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setRepeat(repeat === "off" ? "all" : repeat === "all" ? "one" : "off")
              }
            >
              {repeatLabel}
            </Button>
            <Button variant="secondary" onClick={prev}>
              Prev
            </Button>
            <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
            <Button variant="secondary" onClick={next}>
              Next
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={[Math.min(currentTime, duration || 0)]}
              max={duration || 1}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0] ?? 0)}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>Vol</span>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => setVolume(value[0] ?? 0.8)}
              className="max-w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
