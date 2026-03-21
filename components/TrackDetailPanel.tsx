"use client";

import Image from "next/image";
import { X, ListPlus, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Track } from "@/data/tracks";
import ComparePlayer from "./ComparePlayer";

type TrackDetailPanelProps = {
  track: Track | null;
  onClose: () => void;
  onPlay: (track: Track) => void;
  onQueue: (track: Track) => void;
};

export default function TrackDetailPanel({
  track,
  onClose,
  onPlay,
  onQueue,
}: TrackDetailPanelProps) {
  if (!track) {
    return (
      <div className="hidden w-0 border-l border-white/10 md:block" />
    );
  }

  return (
    <div className="hidden w-[340px] flex-shrink-0 overflow-y-auto border-l border-white/10 md:flex md:flex-col">
      {/* Close */}
      <div className="flex flex-shrink-0 justify-end px-4 pt-4">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 text-white/40 hover:text-white"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Artwork */}
      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden bg-white/5">
        <Image
          src={track.artwork.src}
          alt={track.artwork.alt ?? track.title}
          fill
          sizes="340px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-shrink-0 px-5 py-4">
        <h2 className="text-base font-semibold text-white">{track.title}</h2>
        <p className="mt-0.5 text-sm italic text-white/50">{track.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {track.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => onPlay(track)}>
            <Play className="mr-1.5 size-3.5" />
            Play
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onQueue(track)}>
            <ListPlus className="mr-1.5 size-3.5" />
            Queue
          </Button>
        </div>
      </div>

      {/* Lyrics — first-class, no accordion */}
      {track.lyrics ? (
        <div className="border-t border-white/10 px-5 pb-4 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            Lyrics
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-white/75">
            {track.lyrics.text}
          </p>
        </div>
      ) : null}

      {/* Compare */}
      {track.audio.originalUrl ? (
        <div className="border-t border-white/10 px-5 pb-4 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            Compare Versions
          </p>
          <ComparePlayer track={track} />
        </div>
      ) : null}

      {/* Downloads */}
      {track.downloads?.allow ? (
        <div className="border-t border-white/10 px-5 pb-6 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            Downloads
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={track.audio.sunoCoverUrl}
              download={track.downloads.filename ?? `${track.title}.mp3`}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
            >
              Suno Cover
            </a>
            {track.audio.originalUrl ? (
              <a
                href={track.audio.originalUrl}
                download
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
              >
                Original
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
