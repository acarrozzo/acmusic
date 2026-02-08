"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/player/store";

export default function PlayerAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setAudioRef = usePlayerStore((state) => state.setAudioRef);
  const syncCurrentTime = usePlayerStore((state) => state.syncCurrentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const handleEnded = usePlayerStore((state) => state.handleEnded);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioRef(audio);

    const handleTimeUpdate = () => syncCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [handleEnded, setAudioRef, setDuration, setIsPlaying, syncCurrentTime]);

  return <audio ref={audioRef} preload="metadata" />;
}
