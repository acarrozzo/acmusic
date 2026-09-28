import { create } from "zustand";

/**
 * UI state that has to be shared across the shell: the song panel on the
 * right and the queue drawer.
 *
 * The panel has two modes:
 *  - "now-playing": opened from the bottom bar. Always shows the current
 *    track and follows the queue as it advances.
 *  - "selected": opened from a catalog row. Pinned to that song so lyrics
 *    don't change under the reader; a strip offers to jump to what's playing.
 */
export type PanelMode = "now-playing" | "selected";

export const SIDEBAR_KEY = "acmusic.sidebarCollapsed";

type UiState = {
  panelOpen: boolean;
  panelMode: PanelMode;
  panelTrackId: string | null;
  queueOpen: boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openNowPlaying: () => void;
  openTrack: (trackId: string) => void;
  closePanel: () => void;
  togglePanel: () => void;
  setQueueOpen: (open: boolean) => void;
};

export const useUi = create<UiState>((set, get) => ({
  panelOpen: false,
  panelMode: "now-playing",
  panelTrackId: null,
  queueOpen: false,
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => {
    set({ sidebarCollapsed: collapsed });
    try {
      window.localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0");
    } catch {
      /* private mode etc. */
    }
  },
  openNowPlaying: () =>
    set({ panelOpen: true, panelMode: "now-playing", panelTrackId: null }),
  openTrack: (trackId) =>
    set({ panelOpen: true, panelMode: "selected", panelTrackId: trackId }),
  closePanel: () => set({ panelOpen: false }),
  togglePanel: () => {
    const { panelOpen, panelMode } = get();
    if (panelOpen && panelMode === "now-playing") set({ panelOpen: false });
    else get().openNowPlaying();
  },
  setQueueOpen: (open) => set({ queueOpen: open }),
}));
