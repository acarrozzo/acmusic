export type Group = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
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
    brand: { accent: "#c28a5c", markText: "CR" },
    order: 1,
  },
  {
    id: "saint-anthony",
    name: "Saint Anthony",
    tagline: "Songs from the quiet room.",
    description:
      "Soft-spoken compositions with devotional harmony and slow glow.",
    brand: { accent: "#9aa5b1", markText: "SA" },
    order: 2,
  },
  {
    id: "odd-emcee",
    name: "Odd Emcee",
    tagline: "Left turns and sharp corners.",
    description:
      "Rhymed narratives with playful rhythm shifts and sub-heavy hooks.",
    brand: { accent: "#8b7cff", markText: "OE" },
    order: 3,
  },
];
