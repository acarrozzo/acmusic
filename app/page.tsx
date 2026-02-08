"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import FiltersBar from "@/components/FiltersBar";
import GroupSection from "@/components/GroupSection";
import PlayerBar from "@/components/PlayerBar";
import { groups } from "@/data/groups";
import { tracks, type Track } from "@/data/tracks";
import { filterTracks, getAllTags, sortTracks } from "@/lib/filters";
import type { FiltersState, SortOption } from "@/lib/filters";
import { usePlayerStore } from "@/lib/player/store";

const sortGroups = [...groups].sort((a, b) => a.order - b.order);

const shuffleArray = <T,>(items: T[]) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

export default function Home() {
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    groupId: "all",
    tags: [],
    sort: "group",
  });

  const setQueue = usePlayerStore((state) => state.setQueue);
  const enqueue = usePlayerStore((state) => state.enqueue);

  const allTags = useMemo(() => getAllTags(tracks), [tracks]);

  const filteredTracks = useMemo(
    () => filterTracks(tracks, groups, filters),
    [filters, groups, tracks],
  );

  const groupedTracks = useMemo(() => {
    return sortGroups.map((group) => {
      const groupTracks = filteredTracks.filter(
        (track) => track.groupId === group.id,
      );
      return sortTracks(groupTracks, filters.sort);
    });
  }, [filteredTracks, filters.sort]);

  const playableTracks = useMemo(() => {
    return sortGroups.flatMap((group) => {
      const groupTracks = filteredTracks.filter(
        (track) => track.groupId === group.id,
      );
      return sortTracks(groupTracks, filters.sort);
    });
  }, [filteredTracks, filters.sort]);

  const handlePlayTrack = (track: Track, context: Track[]) => {
    const startIndex = context.findIndex((item) => item.id === track.id);
    setQueue(context, Math.max(0, startIndex));
  };

  const handlePlayGroup = (groupId: string, shouldShuffle: boolean) => {
    const groupTracks = filteredTracks.filter((track) => track.groupId === groupId);
    const ordered = sortTracks(groupTracks, filters.sort);
    setQueue(shouldShuffle ? shuffleArray(ordered) : ordered, 0);
  };

  const handlePlayAll = (shouldShuffle: boolean) => {
    const ordered = shouldShuffle ? shuffleArray(playableTracks) : playableTracks;
    if (ordered.length > 0) {
      setQueue(ordered, 0);
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleGroupChange = (value: string | "all") => {
    setFilters((prev) => ({ ...prev, groupId: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((item) => item !== tag) : [...prev.tags, tag],
      };
    });
  };

  const handleSortChange = (value: SortOption) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: "", groupId: "all", tags: [], sort: "group" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <FiltersBar
        groups={sortGroups}
        allTags={allTags}
        search={filters.search}
        groupId={filters.groupId}
        selectedTags={filters.tags}
        sort={filters.sort}
        onSearchChange={handleSearchChange}
        onGroupChange={handleGroupChange}
        onTagToggle={handleTagToggle}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      <main className="pb-40">
        <section className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handlePlayAll(false)}
              className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/90 transition hover:border-white hover:text-white"
            >
              Play All
            </button>
            <button
              onClick={() => handlePlayAll(true)}
              className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/90 transition hover:border-white hover:text-white"
            >
              Shuffle All
            </button>
            {filters.groupId !== "all" || filters.tags.length > 0 || filters.search ? (
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Filters applied
              </p>
            ) : null}
          </div>
        </section>

        {sortGroups.map((group, index) => (
          <GroupSection
            key={group.id}
            group={group}
            tracks={groupedTracks[index] ?? []}
            onPlayGroup={handlePlayGroup}
            onPlayTrack={handlePlayTrack}
            onQueueTrack={enqueue}
          />
        ))}

        <section
          id="about"
          className="mx-auto w-full max-w-6xl px-6 py-16 text-white/70"
        >
          <h2 className="text-2xl font-semibold text-white">About</h2>
          <p className="mt-4 max-w-2xl text-sm">
            AC Music is a home for alternate versions of songs written across the
            years. These are the recordings I always heard in my head, finally
            given a new body.
          </p>
        </section>

        <section
          id="gear"
          className="mx-auto w-full max-w-6xl px-6 py-16 text-white/70"
        >
          <h2 className="text-2xl font-semibold text-white">Gear &amp; Process</h2>
          <p className="mt-4 max-w-2xl text-sm">
            Song sketches begin on guitar or piano, then I rebuild the arrangements
            with modern production tools. The final mixes lean into space, texture,
            and cinematic detail.
          </p>
        </section>

        <section
          id="contact"
          className="mx-auto w-full max-w-6xl px-6 py-16 text-white/70"
        >
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-4 max-w-2xl text-sm">
            For licensing, collaborations, or questions, email
            <span className="text-white"> hello@acmusic.com</span>.
          </p>
        </section>

        <section
          id="signup"
          className="mx-auto w-full max-w-6xl px-6 py-16 text-white/70"
        >
          <h2 className="text-2xl font-semibold text-white">Signup</h2>
          <p className="mt-4 max-w-2xl text-sm">
            A soft invite: subscribe for new drops and rare originals.
          </p>
        </section>
      </main>

      <PlayerBar />
    </div>
  );
}
