import { ArrowUpRight } from "lucide-react";
import type { StreamingLinks as Links } from "@/data/albums";

const SERVICES = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "soundcloud", label: "SoundCloud" },
  { key: "youtube", label: "YouTube" },
] as const;

type StreamingLinksProps = {
  links?: Links;
  /** What the links point at, for screen readers. */
  title: string;
};

/** Pill links out to the released version on streaming services. */
export default function StreamingLinks({ links, title }: StreamingLinksProps) {
  if (!links) return null;

  return (
    <>
      {SERVICES.map(({ key, label }) =>
        links[key] ? (
          <a
            key={key}
            href={links[key]}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} on ${label}`}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/50 transition hover:border-white/40 hover:text-white"
          >
            {label}
            <ArrowUpRight className="size-2.5" />
          </a>
        ) : null,
      )}
    </>
  );
}
