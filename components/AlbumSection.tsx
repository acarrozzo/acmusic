"use client";

import Image from "next/image";
import { ListPlus, Play } from "lucide-react";
import type { Album } from "@/data/albums";
import type { Track } from "@/data/tracks";
import { Button } from "@/components/ui/button";
import { albumSummary } from "@/lib/catalog";
import StreamingLinks from "./StreamingLinks";
import TrackRow from "./TrackRow";

type AlbumSectionProps = {
  album: Album;
  /** The album's tracks that survive the current filters, in track order. */
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onPlayAlbum: (tracks: Track[]) => void;
  onQueueTrack: (track: Track) => void;
  onQueueAlbum: (tracks: Track[]) => void;
};

/** An album inside a persona's section: cover header, then numbered rows. */
export default function AlbumSection({
  album,
  tracks,
  onPlayTrack,
  onPlayAlbum,
  onQueueTrack,
  onQueueAlbum,
}: AlbumSectionProps) {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="relative size-14 flex-shrink-0 overflow-hidden rounded-md bg-white/10">
          <Image
            src={album.artwork.src}
            alt={album.artwork.alt ?? album.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">{album.title}</h3>
          <p className="truncate text-xs text-white/40">{albumSummary(album)}</p>
          {album.description ? (
            <p className="mt-0.5 hidden truncate text-xs italic text-white/30 sm:block">
              {album.description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <div className="mr-1 hidden items-center gap-1 md:flex">
            <StreamingLinks links={album.links} title={album.title} />
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs text-white/60 hover:text-white"
            onClick={() => onPlayAlbum(tracks)}
          >
            <Play className="size-3" />
            Play
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 text-white/60 hover:text-white"
            onClick={() => onQueueAlbum(tracks)}
            aria-label={`Add ${album.title} to queue`}
          >
            <ListPlus className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        {tracks.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            numbered
            onPlay={onPlayTrack}
            onQueue={onQueueTrack}
          />
        ))}
      </div>
    </div>
  );
}
