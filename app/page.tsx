"use client";

import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import GroupSection from "@/components/GroupSection";
import TrackDetailPanel from "@/components/TrackDetailPanel";
import MiniPlayerBar from "@/components/MiniPlayerBar";
import AboutView from "@/components/AboutView";
import { groups } from "@/data/groups";
import { tracks, type Track } from "@/data/tracks";
import { filterTracks, getAllTags, sortTracks } from "@/lib/filters";
import type { FiltersState } from "@/lib/filters";
import { usePlayerStore } from "@/lib/player/store";

const sortedGroups = [...groups].sort((a, b) => a.order - b.order);

const shuffleArray = <T,>(items: T[]): T[] => {
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
  });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [view, setView] = useState<"music" | "about">("music");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const setQueue = usePlayerStore((s) => s.setQueue);
  const enqueue = usePlayerStore((s) => s.enqueue);

  // Derived data
  const allTags = useMemo(() => getAllTags(tracks), []);
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tracks.length };
    for (const track of tracks) {
      counts[track.groupId] = (counts[track.groupId] ?? 0) + 1;
    }
    return counts;
  }, []);
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const track of tracks) {
      for (const tag of track.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, []);
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
  const playableTracks = useMemo(
    () =>
      sortedGroups.flatMap((group) =>
        sortTracks(filteredTracks.filter((t) => t.groupId === group.id)),
      ),
    [filteredTracks],
  );
  const activeGroup = useMemo(
    () =>
      filters.groupId === "all"
        ? null
        : (sortedGroups.find((g) => g.id === filters.groupId) ?? null),
    [filters.groupId],
  );
  const hasActiveFilters =
    filters.search !== "" ||
    filters.groupId !== "all" ||
    filters.tags.length > 0;

  // Handlers
  const handlePlayTrack = (track: Track, context: Track[]) => {
    const startIndex = context.findIndex((t) => t.id === track.id);
    setQueue(context, Math.max(0, startIndex));
  };

  const handlePlayGroup = (groupId: string, shouldShuffle: boolean) => {
    const groupTracks = filteredTracks.filter((t) => t.groupId === groupId);
    const ordered = sortTracks(groupTracks);
    setQueue(shouldShuffle ? shuffleArray(ordered) : ordered, 0);
  };

  const handlePlayAll = (shouldShuffle: boolean) => {
    const ordered = shouldShuffle ? shuffleArray(playableTracks) : playableTracks;
    if (ordered.length > 0) setQueue(ordered, 0);
  };

  const handleGroupChange = (id: string | "all") => {
    setFilters((prev) => ({ ...prev, groupId: id }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleClearFilters = () => {
    setFilters({ search: "", groupId: "all", tags: [] });
  };

  const handleSelectTrack = (track: Track) => {
    setSelectedTrack((prev) => (prev?.id === track.id ? null : track));
  };

  const sidebarProps = {
    groups: sortedGroups,
    groupCounts,
    allTags,
    tagCounts,
    groupId: filters.groupId,
    selectedTags: filters.tags,
    view,
    onGroupChange: (id: string | "all") => {
      handleGroupChange(id);
      setMobileDrawerOpen(false);
    },
    onTagToggle: handleTagToggle,
    onViewChange: (v: "music" | "about") => {
      setView(v);
      setMobileDrawerOpen(false);
    },
  };

  return (
    <div className="flex h-full">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <SheetContent
          side="left"
          className="w-64 border-white/10 bg-black p-0 [&>button]:hidden"
        >
          <Sidebar {...sidebarProps} />
        </SheetContent>
      </Sheet>

      {/* Right side: content + mini player */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/60"
            onClick={() => setMobileDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <p className="text-sm font-medium tracking-wide text-white/70">
            AC MUSIC
          </p>
        </div>

        {/* Content row */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Main tracklist */}
          <main className="flex-1 overflow-y-auto">
            <TopBar
              search={filters.search}
              activeGroup={activeGroup}
              hasActiveFilters={hasActiveFilters}
              onSearchChange={(v) =>
                setFilters((prev) => ({ ...prev, search: v }))
              }
              onPlayAll={() => handlePlayAll(false)}
              onShuffleAll={() => handlePlayAll(true)}
              onClearFilters={handleClearFilters}
            />

            {view === "about" ? (
              <AboutView />
            ) : (
              <div className="px-2 py-3">
                {sortedGroups.map((group, index) => (
                  <GroupSection
                    key={group.id}
                    group={group}
                    tracks={groupedTracks[index] ?? []}
                    selectedTrack={selectedTrack}
                    onPlayGroup={handlePlayGroup}
                    onPlayTrack={handlePlayTrack}
                    onQueueTrack={enqueue}
                    onQueueGroup={(groupTracks) =>
                      groupTracks.forEach(enqueue)
                    }
                    onSelectTrack={handleSelectTrack}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Detail panel */}
          <TrackDetailPanel
            track={selectedTrack}
            onClose={() => setSelectedTrack(null)}
            onPlay={(track) => {
              const context =
                playableTracks.length > 0 ? playableTracks : [track];
              handlePlayTrack(track, context);
            }}
            onQueue={enqueue}
          />
        </div>

        {/* Mini player */}
        <MiniPlayerBar />
      </div>
    </div>
  );
}
