"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import BottomPlayer from "@/components/BottomPlayer";
import SongPanel from "@/components/SongPanel";
import { tracks } from "@/data/tracks";
import { getAllTags } from "@/lib/filters";
import { orderedTracks } from "@/lib/catalog";
import { usePlayerStore } from "@/lib/player/store";
import { useNavHistory } from "@/lib/navHistory";
import { SIDEBAR_KEY, useUi } from "@/lib/ui";
import { useBackToCatalog } from "@/lib/useBackToCatalog";
import { useMediaQuery } from "@/lib/useMediaQuery";

const allTags = getAllTags(tracks);
const groupCounts: Record<string, number> = { all: tracks.length };
const tagCounts: Record<string, number> = {};
for (const track of tracks) {
  groupCounts[track.groupId] = (groupCounts[track.groupId] ?? 0) + 1;
  for (const tag of track.tags) tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
}

const isTypingTarget = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  return Boolean(
    el &&
      (el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable),
  );
};

/** Escape: close the song panel if it's showing, otherwise leave a song page. */
function EscapeHandler({ panelVisible }: { panelVisible: boolean }) {
  const pathname = usePathname();
  const closePanel = useUi((s) => s.closePanel);
  const queueOpen = useUi((s) => s.queueOpen);
  const { go } = useBackToCatalog();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || isTypingTarget(e.target)) return;
      if (queueOpen) return; // the drawer handles its own Escape
      if (panelVisible) {
        closePanel();
        return;
      }
      if (pathname.startsWith("/song/")) go();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, panelVisible, queueOpen, closePanel, go]);
  return null;
}

function RouteRecorder() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const record = useNavHistory((s) => s.record);
  const query = searchParams.toString();
  useEffect(() => {
    record(query ? `${pathname}?${query}` : pathname);
  }, [pathname, query, record]);
  return null;
}

/**
 * Persistent chrome around every route: top bar, sidebar, bottom player.
 * <main> is the scroll container; see lib/scrollMemory.ts for how pages
 * restore or reset its position.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const queueLength = usePlayerStore((s) => s.queue.length);
  const currentTrackId = usePlayerStore(
    (s) => s.queue[s.currentIndex]?.id ?? null,
  );

  // Song panel: inline column on desktop, sheet on phones. Hidden when the
  // page you're on is already that song.
  const panelOpen = useUi((s) => s.panelOpen);
  const panelMode = useUi((s) => s.panelMode);
  const panelTrackId = useUi((s) => s.panelTrackId);
  const closePanel = useUi((s) => s.closePanel);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sidebarCollapsed = useUi((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useUi((s) => s.setSidebarCollapsed);

  // Remember the rail preference per browser.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(SIDEBAR_KEY) === "1") setSidebarCollapsed(true);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const shownTrackId = panelMode === "selected" ? panelTrackId : currentTrackId;
  const panelVisible =
    panelOpen && !(shownTrackId && pathname === `/song/${shownTrackId}`);

  // Preload the full catalog into the player so the bottom bar has something
  // to show before the first click.
  useEffect(() => {
    if (queueLength === 0) setQueue(orderedTracks, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const sidebar = useMemo(
    () => (
      <Sidebar
        groupCounts={groupCounts}
        allTags={allTags}
        tagCounts={tagCounts}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
    ),
    [sidebarCollapsed, setSidebarCollapsed],
  );
  const drawerSidebar = useMemo(
    () => (
      <Sidebar groupCounts={groupCounts} allTags={allTags} tagCounts={tagCounts} />
    ),
    [],
  );

  return (
    <div className="flex h-full flex-col">
      <Suspense fallback={null}>
        <RouteRecorder />
        <EscapeHandler panelVisible={panelVisible} />
      </Suspense>
      <Suspense fallback={<div className="h-[57px] flex-shrink-0 border-b border-white/[0.07] bg-zinc-950" />}>
        <TopBar onMobileMenuOpen={() => setMobileDrawerOpen(true)} />
      </Suspense>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Suspense
            fallback={
              <div
                className={`h-full border-r border-white/[0.07] bg-zinc-950 ${
                  sidebarCollapsed ? "w-14" : "w-64"
                }`}
              />
            }
          >
            {sidebar}
          </Suspense>
        </div>

        <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
          <SheetContent
            side="left"
            className="w-64 border-white/[0.07] bg-zinc-950 p-0 [&>button]:hidden"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Suspense fallback={null}>{drawerSidebar}</Suspense>
          </SheetContent>
        </Sheet>

        <main className="min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>

        {panelVisible && isDesktop ? (
          <aside
            aria-label="Song details"
            className="hidden w-[360px] flex-shrink-0 border-l border-white/[0.07] bg-zinc-950/60 md:block"
          >
            <SongPanel />
          </aside>
        ) : null}
      </div>

      <Sheet
        open={panelVisible && !isDesktop}
        onOpenChange={(open) => {
          if (!open) closePanel();
        }}
      >
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full border-white/[0.07] bg-zinc-950 p-0 sm:max-w-md"
        >
          <SheetTitle className="sr-only">Song details</SheetTitle>
          <SongPanel />
        </SheetContent>
      </Sheet>

      <BottomPlayer />
    </div>
  );
}
