import type { Track } from "@/data/tracks";

export const loadTrack = (
  audio: HTMLAudioElement | null,
  track: Track | null,
  autoplay: boolean,
) => {
  if (!audio || !track) return;
  if (audio.src.endsWith(track.audio.sunoCoverUrl)) {
    if (autoplay) {
      void audio.play();
    }
    return;
  }
  audio.src = track.audio.sunoCoverUrl;
  audio.load();
  if (autoplay) {
    void audio.play();
  }
};

export const playAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  void audio.play();
};

export const pauseAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.pause();
};

export const seekAudio = (audio: HTMLAudioElement | null, time: number) => {
  if (!audio) return;
  audio.currentTime = time;
};

export const setAudioVolume = (audio: HTMLAudioElement | null, volume: number) => {
  if (!audio) return;
  audio.volume = volume;
};
