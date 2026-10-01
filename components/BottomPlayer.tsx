"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import {
  ChevronUp,
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
import { usePathname } from "next/navigation";
import { songHref } from "@/lib/catalog";
import { useUi } from "@/lib/ui";
import { formatTime } from "@/lib/utils";

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
  const togglePanel = useUi((s) => s.togglePanel);
  const panelOpen = useUi((s) => s.panelOpen);
  const panelMode = useUi((s) => s.panelMode);
  const pathname = usePathname();
  const panelShowsNowPlaying = panelOpen && panelMode === "now-playing";

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
        Pick a song, any of them are a good start.
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-zinc-950 px-4 py-3">
      <div className="flex items-center gap-4">

        {/* Left: artwork + track info — opens the song panel. On the song's
            own page there is nothing to open, so the block is inert. */}
        {(() => {
          const onOwnPage = pathname === songHref(currentTrack.id);
          const hint = onOwnPage
            ? "this page"
            : panelShowsNowPlaying
            ? "hide"
            : "details";
          return (
            <button
              type="button"
              onClick={onOwnPage ? undefined : togglePanel}
              disabled={onOwnPage}
              aria-expanded={onOwnPage ? undefined : panelShowsNowPlaying}
              aria-label={
                onOwnPage
                  ? `${currentTrack.title} is open`
                  : panelShowsNowPlaying
                  ? "Hide song details"
                  : `Show details for ${currentTrack.title}`
              }
              className={`group -ml-1 flex w-56 flex-shrink-0 items-center gap-3 rounded-lg py-1 pl-1 pr-2 text-left transition lg:w-72 ${
                onOwnPage ? "cursor-default" : "hover:bg-white/5"
              }`}
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white/10">
                <Image
                  src={currentTrack.artwork.src}
                  alt={currentTrack.artwork.alt ?? currentTrack.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                {!onOwnPage ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <ChevronUp
                      className={`size-4 text-white transition ${panelShowsNowPlaying ? "rotate-180" : ""}`}
                    />
                  </div>
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 group-hover:text-emerald-300/80">
                  {isPlaying ? "Now playing" : "Up next"} · {hint}
                </p>
                <p className="truncate text-sm font-medium text-white">
                  {currentTrack.title}
                </p>
                <p className="truncate text-xs italic text-white/50">
                  {currentTrack.description}
                </p>
              </div>
            </button>
          );
        })()}

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
