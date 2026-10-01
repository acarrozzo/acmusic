"use client";

import { ListPlus, Play } from "lucide-react";
import type { Group } from "@/data/groups";
import type { Track } from "@/data/tracks";
import { Button } from "@/components/ui/button";
import { sortedAlbums } from "@/lib/catalog";
import AlbumSection from "./AlbumSection";
import TrackRow from "./TrackRow";

type GroupSectionProps = {
  group: Group;
  tracks: Track[];
  onPlayGroup: (groupId: string, shuffle: boolean) => void;
  onPlayTrack: (track: Track, context: Track[]) => void;
  onQueueTrack: (track: Track) => void;
  onQueueGroup: (tracks: Track[]) => void;
  /** The catalog is filtered to this persona: room for its story. */
  featured?: boolean;
};

export default function GroupSection({
  group,
  tracks,
  onPlayGroup,
  onPlayTrack,
  onQueueTrack,
  onQueueGroup,
  featured = false,
}: GroupSectionProps) {
  if (tracks.length === 0) return null;

  const accent = group.brand?.accent ?? "rgba(255,255,255,0.2)";
  const looseTracks = tracks.filter((t) => !t.albumId);
  const albumSections = sortedAlbums
    .filter((album) => album.groupId === group.id)
    .map((album) => ({
      album,
      tracks: tracks.filter((t) => t.albumId === album.id),
    }))
    .filter((section) => section.tracks.length > 0);

  return (
    <section id={group.id} className="mb-6">
      <div
        className="mb-1 flex items-center justify-between py-3 pl-4 pr-3"
        style={{ borderLeft: `3px solid ${accent}` }}
      >
        <div className="pl-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            {group.brand?.markText ?? group.name.slice(0, 2)}
          </p>
          <h2 className="text-base font-semibold text-white">{group.name}</h2>
          {group.tagline ? (
            <p className="text-xs text-white/40">{group.tagline}</p>
          ) : null}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs text-white/60 hover:text-white"
            onClick={() => onPlayGroup(group.id, false)}
          >
            <Play className="size-3" />
            Play
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 text-white/60 hover:text-white"
            onClick={() => onQueueGroup(tracks)}
            aria-label={`Add ${group.name} to queue`}
          >
            <ListPlus className="size-3.5" />
          </Button>
        </div>
      </div>

      {featured && group.story ? (
        <p className="mb-4 max-w-3xl px-6 text-sm leading-relaxed text-white/50">
          {group.story}
        </p>
      ) : null}

      <div className="flex flex-col">
        {looseTracks.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            onPlay={(t) => onPlayTrack(t, tracks)}
            onQueue={onQueueTrack}
          />
        ))}
      </div>

      {albumSections.map(({ album, tracks: albumTracks }) => (
        <AlbumSection
          key={album.id}
          album={album}
          tracks={albumTracks}
          onPlayTrack={(t) => onPlayTrack(t, tracks)}
          onPlayAlbum={(list) => onPlayTrack(list[0], list)}
          onQueueTrack={onQueueTrack}
          onQueueAlbum={onQueueGroup}
        />
      ))}
    </section>
  );
}
