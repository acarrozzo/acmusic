"use client";

import { useEffect, useMemo, useRef } from "react";
import GroupSection from "@/components/GroupSection";
import FeaturedSection from "@/components/FeaturedSection";
import { Button } from "@/components/ui/button";
import { groups } from "@/data/groups";
import { tracks, type Track } from "@/data/tracks";
import { filterTracks, sortTracks } from "@/lib/filters";
import { orderedTracks, shuffleArray, sortedGroups } from "@/lib/catalog";
import { useCatalogFilters } from "@/lib/useCatalogFilters";
import { usePlayerStore } from "@/lib/player/store";
import { scrollToTop, useRestoreScroll } from "@/lib/scrollMemory";

export default function Catalog() {
  const { filters, hasActiveFilters, clear } = useCatalogFilters();
  const containerRef = useRestoreScroll("catalog");

  // Changing filters is a new view: start it from the top.
  const filterKey = `${filters.groupId}|${filters.tags.join(",")}|${filters.search}`;
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToTop(containerRef.current);
  }, [filterKey, containerRef]);
  const playQueue = usePlayerStore((s) => s.playQueue);
  const enqueue = usePlayerStore((s) => s.enqueue);

  const filteredTracks = useMemo(
    () => filterTracks(tracks, groups, filters),
    [filters],
  );
  const groupedTracks = useMemo(
    () =>
      sortedGroups.map((group) =>
        sortTracks(filteredTracks.filter((t) => t.groupId === group.id)),
      ),
    [filteredTracks],
  );
  const playableTracks = useMemo(() => groupedTracks.flat(), [groupedTracks]);

  const handlePlayTrack = (track: Track, context: Track[]) => {
    const startIndex = context.findIndex((t) => t.id === track.id);
    playQueue(context, Math.max(0, startIndex));
  };

  const handlePlayGroup = (groupId: string, shouldShuffle: boolean) => {
    const ordered = sortTracks(filteredTracks.filter((t) => t.groupId === groupId));
    playQueue(shouldShuffle ? shuffleArray(ordered) : ordered, 0);
  };

  return (
    <div ref={containerRef} className="px-2 py-3">
      {!hasActiveFilters && (
        <FeaturedSection
          onPlay={(track) => handlePlayTrack(track, orderedTracks)}
        />
      )}

      {playableTracks.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-white/40">No songs match those filters.</p>
          <Button variant="secondary" size="sm" onClick={clear}>
            Clear filters
          </Button>
        </div>
      ) : null}

      {sortedGroups.map((group, index) => (
        <GroupSection
          key={group.id}
          group={group}
          tracks={groupedTracks[index] ?? []}
          onPlayGroup={handlePlayGroup}
          onPlayTrack={handlePlayTrack}
          onQueueTrack={enqueue}
          onQueueGroup={(groupTracks) => groupTracks.forEach(enqueue)}
        />
      ))}
    </div>
  );
}
