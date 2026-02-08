"use client";

import { useState } from "react";
import type { Track } from "@/data/tracks";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ComparePlayer from "./ComparePlayer";

type TrackExpandProps = {
  track: Track;
};

export default function TrackExpand({ track }: TrackExpandProps) {
  const [largeText, setLargeText] = useState(false);

  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      {track.lyrics ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Lyrics
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLargeText((value) => !value)}
            >
              {largeText ? "Smaller text" : "Bigger text"}
            </Button>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="lyrics">
              <AccordionTrigger>Read lyrics</AccordionTrigger>
              <AccordionContent>
                <div
                  className={`rounded-xl border border-white/10 bg-black/30 p-4 text-white/80 ${
                    largeText ? "text-base" : "text-sm"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">
                    {track.lyrics.text}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}

      {track.audio.originalUrl ? (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Compare
          </p>
          <ComparePlayer track={track} />
        </div>
      ) : null}

      {track.downloads?.allow ? (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Downloads
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a
              href={track.audio.sunoCoverUrl}
              download={track.downloads.filename ?? `${track.title}.mp3`}
              className="rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:text-white"
            >
              Download Suno Cover
            </a>
            {track.audio.originalUrl ? (
              <a
                href={track.audio.originalUrl}
                download
                className="rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:text-white"
              >
                Download Original
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
