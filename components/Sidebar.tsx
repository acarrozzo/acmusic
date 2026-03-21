"use client";

import type { Group } from "@/data/groups";

type SidebarProps = {
  groups: Group[];
  groupCounts: Record<string, number>;
  allTags: string[];
  tagCounts: Record<string, number>;
  groupId: string | "all";
  selectedTags: string[];
  view: "music" | "about";
  onGroupChange: (id: string | "all") => void;
  onTagToggle: (tag: string) => void;
  onViewChange: (view: "music" | "about") => void;
};

export default function Sidebar({
  groups,
  groupCounts,
  allTags,
  tagCounts,
  groupId,
  selectedTags,
  view,
  onGroupChange,
  onTagToggle,
  onViewChange,
}: SidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r border-white/10 bg-black">
      {/* Branding */}
      <div className="flex-shrink-0 px-5 py-6">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          AC Music
        </p>
        <p className="mt-1.5 max-w-[180px] text-xs leading-relaxed text-white/25">
          Thirty years of songs, finally heard.
        </p>
      </div>

      {/* Persona nav */}
      <nav className="flex-shrink-0 px-3">
        <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
          Personas
        </p>
        {/* All */}
        <button
          type="button"
          onClick={() => {
            onGroupChange("all");
            if (view !== "music") onViewChange("music");
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${
            groupId === "all" && view === "music"
              ? "bg-white/10 text-white"
              : "text-white/50 hover:bg-white/5 hover:text-white/80"
          }`}
        >
          <span
            className="size-2 flex-shrink-0 rounded-full"
            style={{
              backgroundColor:
                groupId === "all" && view === "music"
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.2)",
            }}
          />
          <span className="flex-1 text-left">All Songs</span>
          <span className="text-xs text-white/30">{groupCounts.all ?? 0}</span>
        </button>

        {/* Personas */}
        {groups.map((group) => {
          const isActive = groupId === group.id && view === "music";
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => {
                onGroupChange(group.id);
                if (view !== "music") onViewChange("music");
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <span
                className="size-2 flex-shrink-0 rounded-full transition-colors"
                style={{
                  backgroundColor: isActive
                    ? (group.brand?.accent ?? "rgba(255,255,255,0.7)")
                    : "rgba(255,255,255,0.2)",
                }}
              />
              <span className="flex-1 truncate text-left">{group.name}</span>
              <span className="text-xs text-white/30">
                {groupCounts[group.id] ?? 0}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="mt-5 flex min-h-0 flex-1 flex-col px-3">
          <p className="mb-2 flex-shrink-0 px-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
            Tags
          </p>
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-wrap gap-1.5 pb-4">
              {allTags.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagToggle(tag)}
                    className={`rounded-full px-2.5 py-0.5 text-xs transition ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/40 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {tag}{" "}
                    <span className="opacity-60">{tagCounts[tag] ?? 0}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-white/10 px-3 py-4">
        <button
          type="button"
          onClick={() =>
            onViewChange(view === "about" ? "music" : "about")
          }
          className={`w-full rounded-lg px-2 py-1.5 text-left text-sm transition ${
            view === "about"
              ? "text-white"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {view === "about" ? "← Back to Music" : "About"}
        </button>
      </div>
    </div>
  );
}
