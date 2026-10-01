"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  ListMusic,
  ListPlus,
  Maximize2,
  Pause,
  Play,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isInstrumentalTrack } from "@/data/tracks";
import {
  albumTrackLine,
  getAlbum,
  getGroup,
  getTrack,
  orderedTracks,
  songHref,
} from "@/lib/catalog";
import { catalogHref } from "@/lib/useCatalogFilters";
import { usePlayerStore } from "@/lib/player/store";
import { useUi } from "@/lib/ui";

const UP_NEXT_COUNT = 5;

/**
 * The right-hand song panel. Content only; AppShell decides whether it is an
 * inline column (desktop) or a sheet (phones).
 */
export default function SongPanel() {
  const panelMode = useUi((s) => s.panelMode);
  const panelTrackId = useUi((s) => s.panelTrackId);
  const openNowPlaying = useUi((s) => s.openNowPlaying);
  const closePanel = useUi((s) => s.closePanel);
  const setQueueOpen = useUi((s) => s.setQueueOpen);

  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const playQueue = usePlayerStore((s) => s.playQueue);
  const playIndex = usePlayerStore((s) => s.playIndex);
  const enqueue = usePlayerStore((s) => s.enqueue);

  const currentTrack = queue[currentIndex] ?? null;
  const track =
    panelMode === "selected" && panelTrackId
      ? (getTrack(panelTrackId) ?? currentTrack)
      : currentTrack;

  const group = useMemo(
    () => (track ? getGroup(track.groupId) : undefined),
    [track],
  );
  const upNext = useMemo(
    () =>
      queue
        .slice(currentIndex + 1, currentIndex + 1 + UP_NEXT_COUNT)
        .map((t, i) => ({ track: t, index: currentIndex + 1 + i })),
    [queue, currentIndex],
  );

  if (!track) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm italic text-white/30">
        Pick a song, any of them are a good start.
      </div>
    );
  }

  const album = getAlbum(track.albumId);
  const isActiveTrack = currentTrack?.id === track.id;
  const isPlayingTrack = isActiveTrack && isPlaying;
  const playbackStarted = isPlaying || currentTime > 0;
  const showNowPlayingStrip =
    panelMode === "selected" && currentTrack && !isActiveTrack && playbackStarted;

  const handlePlay = () => {
    if (isActiveTrack) {
      togglePlay();
      return;
    }
    const queueIndex = queue.findIndex((t) => t.id === track.id);
    if (queueIndex >= 0) playQueue(queue, queueIndex);
    else {
      const index = orderedTracks.findIndex((t) => t.id === track.id);
      playQueue(orderedTracks, Math.max(0, index));
    }
    // Once you start it, this is the now-playing song: follow the queue.
    openNowPlaying();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between px-4 pt-3 pb-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          {panelMode === "now-playing"
            ? isPlaying
              ? "Now playing"
              : "Up next"
            : "Song"}
        </p>
        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs text-white/60 hover:text-white"
          >
            <Link scroll={false} href={songHref(track.id)} onClick={closePanel}>
              <Maximize2 className="size-3.5" />
              Full page
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-white/40 hover:text-white"
            onClick={closePanel}
            aria-label="Close panel"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {showNowPlayingStrip && currentTrack ? (
          <button
            type="button"
            onClick={openNowPlaying}
            className="sticky top-0 z-10 mx-4 mb-3 flex w-[calc(100%-2rem)] items-center gap-2 rounded-lg border border-emerald-400/20 bg-zinc-950 bg-gradient-to-r from-emerald-400/[0.08] to-emerald-400/[0.08] px-3 py-2 text-left text-xs shadow-[0_6px_12px_-6px_rgba(0,0,0,0.8)] transition hover:border-emerald-400/40"
          >
            <span className="size-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
            <span className="min-w-0 flex-1 truncate text-white/70">
              <span className="text-white/40">Now playing:</span>{" "}
              <span className="text-white">{currentTrack.title}</span>
            </span>
            <ArrowRight className="size-3 flex-shrink-0 text-emerald-200" />
          </button>
        ) : null}

        {/* Artwork */}
        <div className="px-4">
          <Link
            scroll={false}
            href={songHref(track.id)}
            onClick={closePanel}
            aria-label={`Open ${track.title} full page`}
            className="relative block aspect-square w-full overflow-hidden rounded-xl bg-white/5"
          >
            <Image
              src={track.artwork.src}
              alt={track.artwork.alt ?? track.title}
              fill
              sizes="360px"
              className="object-cover"
            />
          </Link>
        </div>

        {/* Info */}
        <div className="px-4 pt-4">
          {group ? (
            <Link
              scroll={false}
              href={catalogHref({ search: "", groupId: group.id, tags: [] })}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/35 transition hover:text-white"
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: group.brand?.accent ?? "rgba(255,255,255,0.4)" }}
              />
              {group.name}
            </Link>
          ) : null}
          <h2 className="mt-1 text-lg font-semibold leading-snug text-white">
            <Link scroll={false} href={songHref(track.id)} onClick={closePanel} className="hover:underline">
              {track.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm italic text-white/50">{track.description}</p>
          {album ? (
            <p className="mt-1 text-xs text-white/40">{albumTrackLine(album, track)}</p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {track.tags.map((tag) => (
              <Link
                key={tag}
                scroll={false}
                href={catalogHref({ search: "", groupId: "all", tags: [tag] })}
              >
                <Badge variant="outline" className="text-xs transition hover:border-white/50">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={handlePlay} className="gap-1.5">
              {isPlayingTrack ? (
                <>
                  <Pause className="size-3.5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="size-3.5" />
                  {isActiveTrack && currentTime > 0 ? "Resume" : "Play"}
                </>
              )}
            </Button>
            <Button size="sm" variant="secondary" className="gap-1.5" onClick={() => enqueue(track)}>
              <ListPlus className="size-3.5" />
              Queue
            </Button>
          </div>
        </div>

        {/* Lyrics */}
        <div className="mt-5 border-t border-white/[0.07] px-4 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Lyrics</p>
            {track.lyrics ? (
              <Link
                scroll={false}
                href={songHref(track.id, "lyrics")}
                onClick={closePanel}
                className="text-[10px] text-white/40 transition hover:text-white"
              >
                Read full size
              </Link>
            ) : null}
          </div>
          {track.lyrics ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-white/75">
              {track.lyrics.text}
            </p>
          ) : (
            <p className="text-sm italic text-white/25">
              {isInstrumentalTrack(track) ? "Instrumental" : "No lyrics available"}
            </p>
          )}
        </div>

        {/* Up next */}
        <div className="mt-5 border-t border-white/[0.07] px-4 pt-4 pb-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Up next</p>
            <button
              type="button"
              onClick={() => setQueueOpen(true)}
              className="inline-flex items-center gap-1 text-[10px] text-white/40 transition hover:text-white"
            >
              <ListMusic className="size-3" />
              Full queue ({queue.length})
            </button>
          </div>
          {upNext.length === 0 ? (
            <p className="text-sm italic text-white/25">End of the queue.</p>
          ) : (
            <ul className="flex flex-col">
              {upNext.map(({ track: t, index }) => (
                <li key={`${t.id}-${index}`}>
                  <button
                    type="button"
                    onClick={() => playIndex(index)}
                    className="group flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left transition hover:bg-white/5"
                  >
                    <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded bg-white/10">
                      <Image
                        src={t.artwork.src}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                        <Play className="size-3 text-white" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white/80">{t.title}</span>
                      <span className="block truncate text-[11px] italic text-white/35">
                        {t.description}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
