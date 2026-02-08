import { create } from "zustand";
import type { Track } from "@/data/tracks";
import {
  loadTrack,
  pauseAudio,
  playAudio,
  seekAudio,
  setAudioVolume,
} from "./audioManager";

export type RepeatMode = "off" | "one" | "all";

type PlayerState = {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  currentTime: number;
  duration: number;
  volume: number;
  audioRef: HTMLAudioElement | null;
  setAudioRef: (audio: HTMLAudioElement | null) => void;
  setQueue: (queue: Track[], startIndex?: number) => void;
  enqueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  playIndex: (index: number) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  setShuffle: (enabled: boolean) => void;
  setRepeat: (mode: RepeatMode) => void;
  setCurrentTime: (time: number) => void;
  syncCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  handleEnded: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeat: "off",
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  audioRef: null,
  setAudioRef: (audio) => {
    set({ audioRef: audio });
    const { queue, currentIndex, isPlaying, volume } = get();
    if (!audio || queue.length === 0) {
      return;
    }
    setAudioVolume(audio, volume);
    loadTrack(audio, queue[currentIndex] ?? null, isPlaying);
  },
  setQueue: (queue, startIndex = 0) => {
    set({
      queue,
      currentIndex: startIndex,
      isPlaying: true,
      currentTime: 0,
    });
    loadTrack(get().audioRef, queue[startIndex] ?? null, true);
  },
  enqueue: (track) => {
    set((state) => ({
      queue: [...state.queue, track],
    }));
  },
  removeFromQueue: (index) => {
    const { queue, currentIndex, isPlaying } = get();
    if (index < 0 || index >= queue.length) return;
    const nextQueue = queue.filter((_, i) => i !== index);

    if (nextQueue.length === 0) {
      set({
        queue: [],
        currentIndex: 0,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      });
      pauseAudio(get().audioRef);
      return;
    }

    let nextIndex = currentIndex;
    if (index < currentIndex) {
      nextIndex = currentIndex - 1;
    } else if (index === currentIndex) {
      nextIndex = Math.min(currentIndex, nextQueue.length - 1);
    }

    set({
      queue: nextQueue,
      currentIndex: nextIndex,
    });

    if (index === currentIndex) {
      loadTrack(get().audioRef, nextQueue[nextIndex] ?? null, isPlaying);
    }
  },
  clearQueue: () => {
    set({
      queue: [],
      currentIndex: 0,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    });
    pauseAudio(get().audioRef);
  },
  playIndex: (index) => {
    const { queue } = get();
    if (queue.length === 0) return;
    const nextIndex = Math.max(0, Math.min(index, queue.length - 1));
    set({ currentIndex: nextIndex, isPlaying: true, currentTime: 0 });
    loadTrack(get().audioRef, queue[nextIndex] ?? null, true);
  },
  togglePlay: () => {
    const { isPlaying } = get();
    if (isPlaying) {
      get().pause();
    } else {
      get().play();
    }
  },
  play: () => {
    set({ isPlaying: true });
    playAudio(get().audioRef);
  },
  pause: () => {
    set({ isPlaying: false });
    pauseAudio(get().audioRef);
  },
  next: () => {
    const { queue, currentIndex, shuffle, repeat } = get();
    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;

    if (shuffle && queue.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex);
    }

    if (nextIndex >= queue.length) {
      if (repeat === "all") {
        nextIndex = 0;
      } else {
        set({ isPlaying: false });
        return;
      }
    }

    get().playIndex(nextIndex);
  },
  prev: () => {
    const { audioRef, queue, currentIndex } = get();
    if (!audioRef || queue.length === 0) return;
    if (audioRef.currentTime > 3) {
      seekAudio(audioRef, 0);
      return;
    }
    const prevIndex = Math.max(0, currentIndex - 1);
    get().playIndex(prevIndex);
  },
  setShuffle: (enabled) => set({ shuffle: enabled }),
  setRepeat: (mode) => set({ repeat: mode }),
  setCurrentTime: (time) => {
    set({ currentTime: time });
    seekAudio(get().audioRef, time);
  },
  syncCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => {
    set({ volume });
    setAudioVolume(get().audioRef, volume);
  },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  handleEnded: () => {
    const { repeat, queue, currentIndex, shuffle } = get();
    if (queue.length === 0) return;

    if (repeat === "one") {
      const audio = get().audioRef;
      if (!audio) return;
      seekAudio(audio, 0);
      playAudio(audio);
      return;
    }

    let nextIndex = currentIndex + 1;
    if (shuffle && queue.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex);
    }

    if (nextIndex >= queue.length) {
      if (repeat === "all") {
        nextIndex = 0;
      } else {
        set({ isPlaying: false });
        return;
      }
    }

    get().playIndex(nextIndex);
  },
}));
