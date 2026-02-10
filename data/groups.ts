export type Group = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  artwork?: { src: string; alt?: string };
  brand?: {
    accent?: string;
    markText?: string;
  };
  order: number;
};

export const groups: Group[] = [
  {
    id: "caravaggios-revenge",
    name: "Caravaggio's Revenge",
    tagline: "Baroque heat, modern bones.",
    description:
      "Dramatic, painterly songs with bold contrasts and bright edges.",
    artwork: {
      src: "/songs/groups/caravaggiosrevenge-1.png",
      alt: "Caravaggio's Revenge album art",
    },
    brand: { accent: "#d32f2f", markText: "CR" },
    order: 1,
  },
  {
    id: "saint-anthony",
    name: "Saint Anthony",
    tagline: "Songs from the quiet room.",
    description:
      "Soft-spoken compositions with devotional harmony and slow glow.",
    brand: { accent: "#1976d2", markText: "SA" },
    order: 2,
  },
  {
    id: "strange-sounds-for-strange-times",
    name: "Strange Sounds for Strange Times",
    tagline: "Left turns and sharp corners.",
    description:
      "Rhymed narratives with playful rhythm shifts and sub-heavy hooks.",
    brand: { accent: "#8b7cff", markText: "SS" },
    order: 3,
  },
  {
    id: "banned-from-the-zoo",
    name: "Banned from the Zoo",
    tagline: "Wild sounds from the outside.",
    description:
      "Experimental compositions that break free from conventional boundaries.",
    brand: { accent: "#ff6b35", markText: "BFZ" },
    order: 4,
  },
];
