import { albums, type Album } from "@/data/albums";
import { groups, type Group } from "@/data/groups";
import { tracks, type Track } from "@/data/tracks";
import { sortTracks } from "@/lib/filters";
import { formatTime } from "@/lib/utils";

/** Personas with at least one song, in display order. Empty ones stay hidden. */
export const sortedGroups: Group[] = groups
  .filter((g) => tracks.some((t) => t.groupId === g.id))
  .sort((a, b) => a.order - b.order);

export const sortedAlbums: Album[] = [...albums].sort(
  (a, b) => a.order - b.order,
);

const groupById = new Map(groups.map((g) => [g.id, g]));
const albumById = new Map(albums.map((a) => [a.id, a]));
const trackById = new Map(tracks.map((t) => [t.id, t]));

export const getGroup = (id: string): Group | undefined => groupById.get(id);
export const getAlbum = (id?: string): Album | undefined =>
  id ? albumById.get(id) : undefined;
export const getTrack = (id: string): Track | undefined => trackById.get(id);

/** Every track in catalog order: groups by `order`, tracks by `order` within each group. */
export const orderedTracks: Track[] = sortedGroups.flatMap((group) =>
  sortTracks(tracks.filter((t) => t.groupId === group.id)),
);

/** An album's tracks in track order. */
export const getAlbumTracks = (albumId: string): Track[] =>
  orderedTracks.filter((t) => t.albumId === albumId);

/** "2018 · 7 songs · 23 min" */
export const albumSummary = (album: Album): string => {
  const albumTracks = getAlbumTracks(album.id);
  const seconds = albumTracks.reduce((sum, t) => sum + (t.duration ?? 0), 0);
  const parts = [
    String(album.year),
    `${albumTracks.length} ${albumTracks.length === 1 ? "song" : "songs"}`,
  ];
  if (seconds > 0) parts.push(`${Math.round(seconds / 60)} min`);
  return parts.join(" · ");
};

/** "Drift · 2018 · Track 2 · 2:09" */
export const albumTrackLine = (album: Album, track: Track): string =>
  [
    album.title,
    String(album.year),
    track.trackNumber ? `Track ${track.trackNumber}` : null,
    track.duration ? formatTime(track.duration) : null,
  ]
    .filter(Boolean)
    .join(" · ");

export const shuffleArray = <T,>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

export const songHref = (trackId: string, section?: "lyrics" | "compare") =>
  section ? `/song/${trackId}#${section}` : `/song/${trackId}`;
