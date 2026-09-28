"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The app's scroll container is the <main> element inside AppShell, not the
 * window, so the browser's own scroll restoration never applies. These hooks
 * give each page its own behaviour:
 *   - the catalog remembers where you were and puts you back there
 *   - a song page starts at the top, or at the #lyrics / #compare anchor
 */
const positions = new Map<string, number>();

const findScroller = (el: HTMLElement | null) =>
  el?.closest("main") as HTMLElement | null;

export function useRestoreScroll(key: string) {
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const main = findScroller(ref.current);
    if (!main) return;
    main.scrollTop = positions.get(key) ?? 0;
    const save = () => positions.set(key, main.scrollTop);
    main.addEventListener("scroll", save, { passive: true });
    return () => {
      // Layout cleanup runs while this page's DOM is still in place, so the
      // position is still accurate here even if no scroll event was seen.
      save();
      main.removeEventListener("scroll", save);
    };
  }, [key]);
  return ref;
}

/** Scroll the catalog back to the top (used when filters change). */
export function scrollToTop(el: HTMLElement | null) {
  const main = findScroller(el);
  if (main) main.scrollTop = 0;
}

export function useScrollToTopOrHash() {
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const main = findScroller(ref.current);
    if (!main) return;
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else main.scrollTop = 0;
  }, []);
  return ref;
}
