"use client";

import { ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePlayerStore } from "@/lib/player/store";

export default function QueueDrawer() {
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const playIndex = usePlayerStore((state) => state.playIndex);
  const removeFromQueue = usePlayerStore((state) => state.removeFromQueue);
  const clearQueue = usePlayerStore((state) => state.clearQueue);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ListMusic className="size-4" />
          {queue.length > 0 && (
            <span className="ml-2 text-xs">{queue.length}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[70vh]">
        <SheetHeader>
          <SheetTitle>Queue</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-3">
          {queue.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Queue is empty. Add a track to start listening.
            </p>
          ) : (
            queue.map((track, index) => (
              <div
                key={`${track.id}-${index}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 p-3"
              >
                <button
                  onClick={() => playIndex(index)}
                  className={`text-left text-sm ${
                    index === currentIndex ? "text-white" : "text-white/70"
                  }`}
                >
                  {track.title}
                </button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFromQueue(index)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
        {queue.length > 0 ? (
          <div className="mt-6">
            <Button variant="secondary" onClick={clearQueue}>
              Clear queue
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
