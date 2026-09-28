import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SongPage from "@/components/SongPage";
import { tracks } from "@/data/tracks";
import { getGroup, getTrack } from "@/lib/catalog";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return tracks.map((track) => ({ id: track.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const track = getTrack(id);
  if (!track) return {};
  const group = getGroup(track.groupId);
  const title = group ? `${track.title} — ${group.name}` : track.title;
  return {
    title,
    description: track.description,
    openGraph: {
      title,
      description: track.description,
      type: "music.song",
      images: [{ url: track.artwork.src, alt: track.artwork.alt ?? track.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: track.description,
      images: [track.artwork.src],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const track = getTrack(id);
  if (!track) notFound();
  return <SongPage track={track} />;
}
