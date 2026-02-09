import type { Group } from "@/data/groups";
import type { Track } from "@/data/tracks";

export type FiltersState = {
  search: string;
  groupId: string | "all";
  tags: string[];
};

export const getAllTags = (tracks: Track[]) => {
  const tagSet = new Set<string>();
  tracks.forEach((track) => {
    track.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
};

export const filterTracks = (
  tracks: Track[],
  groups: Group[],
  filters: FiltersState,
) => {
  const search = filters.search.trim().toLowerCase();
  const groupNameById = new Map(groups.map((group) => [group.id, group.name]));

  return tracks.filter((track) => {
    if (filters.groupId !== "all" && track.groupId !== filters.groupId) {
      return false;
    }

    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some((tag) => track.tags.includes(tag));
      if (!hasTag) {
        return false;
      }
    }

    if (!search) {
      return true;
    }

    const groupName = groupNameById.get(track.groupId) ?? "";
    const haystack = [
      track.title,
      track.description,
      groupName,
      track.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
};

export const sortTracks = (tracks: Track[]) =>
  [...tracks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
