import { groups, type Group } from "@/data/groups";
import { tracks, type Track } from "@/data/tracks";
import { sortTracks } from "@/lib/filters";

export const sortedGroups: Group[] = [...groups].sort(
  (a, b) => a.order - b.order,
);

const groupById = new Map(groups.map((g) => [g.id, g]));
const trackById = new Map(tracks.map((t) => [t.id, t]));

export const getGroup = (id: string): Group | undefined => groupById.get(id);
export const getTrack = (id: string): Track | undefined => trackById.get(id);

/** Every track in catalog order: groups by `order`, tracks by `order` within each group. */
export const orderedTracks: Track[] = sortedGroups.flatMap((group) =>
  sortTracks(tracks.filter((t) => t.groupId === group.id)),
);

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
