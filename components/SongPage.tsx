"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, ArrowRight, ListPlus, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Track } from "@/data/tracks";
import { getGroup, orderedTracks, songHref } from "@/lib/catalog";
import { catalogHref } from "@/lib/useCatalogFilters";
import { usePlayerStore } from "@/lib/player/store";
import { useBackToCatalog } from "@/lib/useBackToCatalog";
import { useScrollToTopOrHash } from "@/lib/scrollMemory";
import ComparePlayer from "./ComparePlayer";

function BackToCatalog() {
  const { href, cameFromCatalog, go } = useBackToCatalog();
  return (
    <Link
      scroll={false}
      href={href}
      onClick={(e) => {
        if (cameFromCatalog) {
          e.preventDefault();
          go();
        }
      }}
      className="inline-flex items-center gap-1.5 text-xs text-white/40 transition hover:text-white"
    >
      <ArrowLeft className="size-3.5" />
      Back to catalog
      <kbd className="ml-1 hidden rounded border border-white/15 px-1 text-[9px] text-white/30 sm:inline">esc</kbd>
    </Link>
  );
}

/** Shared with the layout so the sticky artwork column can sit below it. */
function useNowPlayingBanner(track: Track) {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const currentTrack = queue[currentIndex] ?? null;
  const started = isPlaying || currentTime > 0;
  const show = Boolean(currentTrack && currentTrack.id !== track.id && started);
  return { show, currentTrack, isPlaying };
}

function NowPlayingBanner({
  currentTrack,
  isPlaying,
}: {
  currentTrack: Track;
  isPlaying: boolean;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 bg-zinc-900/90 px-6 py-2 backdrop-blur lg:-mx-10 lg:px-10">
      <Link
        scroll={false}
        href={songHref(currentTrack.id)}
        className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2.5 text-sm transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
      >
        <span className="relative flex size-2 flex-shrink-0">
          {isPlaying ? (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60" />
          ) : null}
          <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
        </span>
        <span className="min-w-0 flex-1 truncate text-white/70">
          <span className="text-white/40">{isPlaying ? "Now playing" : "Paused"}:</span>{" "}
          <span className="font-medium text-white">{currentTrack.title}</span>
        </span>
        <span className="flex flex-shrink-0 items-center gap-1 text-xs text-emerald-200">
          Open <ArrowRight className="size-3" />
        </span>
      </Link>
    </div>
  );
}

export default function SongPage({ track }: { track: Track }) {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const playQueue = usePlayerStore((s) => s.playQueue);
  const enqueue = usePlayerStore((s) => s.enqueue);

  const currentTrack = queue[currentIndex] ?? null;
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlayingTrack = isActiveTrack && isPlaying;
  const group = useMemo(() => getGroup(track.groupId), [track.groupId]);
  const containerRef = useScrollToTopOrHash();
  const banner = useNowPlayingBanner(track);

  const handlePlay = () => {
    if (isActiveTrack) {
      togglePlay();
      return;
    }
    // Play from this song onward in catalog order, unless it's already
    // somewhere in the user's queue.
    const queueIndex = queue.findIndex((t) => t.id === track.id);
    if (queueIndex >= 0) {
      playQueue(queue, queueIndex);
    } else {
      const index = orderedTracks.findIndex((t) => t.id === track.id);
      playQueue(orderedTracks, Math.max(0, index));
    }
  };

  return (
    <div ref={containerRef} className="w-full px-6 pb-6 lg:px-10">
      {banner.show && banner.currentTrack ? (
        <NowPlayingBanner currentTrack={banner.currentTrack} isPlaying={banner.isPlaying} />
      ) : (
        <div className="h-6" />
      )}
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <BackToCatalog />
          {group ? (
            <Link
              scroll={false}
              href={catalogHref({ search: "", groupId: group.id, tags: [] })}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 transition hover:text-white"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: group.brand?.accent ?? "rgba(255,255,255,0.4)" }}
              />
              {group.name}
            </Link>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left column: art + meta + compare */}
          <div
            className={`w-full flex-shrink-0 lg:sticky lg:w-80 xl:w-96 ${
              banner.show ? "lg:top-[4.75rem]" : "lg:top-6"
            }`}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/10 shadow-2xl">
              <Image
                src={track.artwork.src}
                alt={track.artwork.alt ?? track.title}
                fill
                sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-semibold leading-tight text-white">
                {track.title}
              </h1>
              <p className="mt-2 text-sm italic text-white/50">{track.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {track.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={catalogHref({ search: "", groupId: "all", tags: [tag] })}
                  >
                    <Badge variant="outline" className="transition hover:border-white/50">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={handlePlay} size="lg" className="gap-2">
                  {isPlayingTrack ? (
                    <>
                      <Pause className="size-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      {isActiveTrack && currentTime > 0 ? "Resume" : "Play"}
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                  onClick={() => enqueue(track)}
                >
                  <ListPlus className="size-4" />
                  Queue
                </Button>
              </div>
            </div>

            {track.audio.originalUrl ? (
              <div id="compare" className="mt-8 scroll-mt-6 border-t border-white/[0.07] pt-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
                  Compare Versions
                </p>
                <ComparePlayer track={track} />
              </div>
            ) : null}

            {track.downloads?.allow ? (
              <div className="mt-8 border-t border-white/[0.07] pt-6">
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

          {/* Right column: lyrics */}
          <div id="lyrics" className="min-w-0 flex-1 scroll-mt-6">
            {track.lyrics ? (
              <>
                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                  Lyrics
                </p>
                <p className="whitespace-pre-line text-lg leading-loose text-white/85">
                  {track.lyrics.text}
                </p>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center lg:h-full lg:min-h-[200px]">
                <p className="text-sm italic text-white/25">No lyrics available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
