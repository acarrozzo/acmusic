"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { Track } from "@/data/tracks";

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

type MiniPlayerProps = {
  src: string;
  label: string;
  sublabel?: string;
};

function MiniPlayer({ src, label, sublabel }: MiniPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0] ?? 0;
    setCurrentTime(value[0] ?? 0);
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
      <p className="text-sm font-medium text-white/80">{label}</p>
      {sublabel ? (
        <p className="mt-1 text-xs text-white/50">{sublabel}</p>
      ) : null}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="mt-3 flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="size-8 shrink-0"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <Slider
          value={[Math.min(currentTime, duration || 0)]}
          max={duration || 1}
          step={1}
          onValueChange={handleSeek}
          className="flex-1"
        />
        <span className="shrink-0 text-xs tabular-nums text-white/50">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

type ComparePlayerProps = {
  track: Track;
};

export default function ComparePlayer({ track }: ComparePlayerProps) {
  if (!track.audio.originalUrl) {
    return null;
  }

  const originalLabel = `Original${track.originalRef?.year ? ` (${track.originalRef.year})` : ""}`;

  return (
    <div className="mt-4 grid gap-4">
      <MiniPlayer src={track.audio.sunoCoverUrl} label="Suno cover" />
      <MiniPlayer
        src={track.audio.originalUrl}
        label={originalLabel}
        sublabel={track.originalRef?.description}
      />
    </div>
  );
}
