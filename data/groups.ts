export type Group = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  story?: string;
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
    story:
      "I wrote these songs at a time when I needed drama. Baroque heat, modern anxiety , the light was always too bright or missing completely. These tracks were born from that contrast, and AI finally gave them the orchestration I always heard in my head at 2am.",
    artwork: {
      src: "/art/caravaggiosrevenge-1.png",
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
    story:
      "Saint Anthony is the name I give to the quiet version of myself , the one who writes slowly and means every word. These songs came from long nights and borrowed pianos, and they still ask the same questions they always did.",
    brand: { accent: "#1976d2", markText: "SA" },
    order: 2,
  },
  {
    id: "acoustic-core",
    name: "Acoustic Core",
    tagline: "Stripped down, turned up.",
    description: "Raw acoustic songs with an edge , where quiet meets intensity.",
    story:
      "Not everything needs distortion to hit hard. These are the songs I wrote with just a guitar and nowhere to hide , acoustic at the core, but not soft about it.",
    brand: { accent: "#4ade80", markText: "AC" },
    order: 3,
  },
  {
    id: "strange-sounds-for-strange-times",
    name: "ss4st",
    tagline: "Left turns and sharp corners.",
    description:
      "Strange Sounds for Strange Times — rhymed narratives with playful rhythm shifts and sub-heavy hooks.",
    story:
      "Sometimes a song just wants to be weird. This is the corner of my catalog where rhyme schemes get slippery, the rhythm shifts mid-bar, and I'm having more fun than I probably should.",
    brand: { accent: "#8b7cff", markText: "SS" },
    order: 6,
  },
  {
    id: "banned-from-the-zoo",
    name: "Banned from the Zoo",
    tagline: "Wild sounds from the outside.",
    description:
      "Experimental compositions that break free from conventional boundaries.",
    story:
      "The experimental wing , songs that didn't fit anywhere else and are better for it. No rules, no genre, just curiosity. I kept these because I think they're the most honest things I've made.",
    brand: { accent: "#ff6b35", markText: "BFZ" },
    order: 7,
  },
  {
    id: "kids",
    name: "Kids",
    tagline: "Songs for my little ones.",
    description:
      "Songs written for Abby and Alex , full of adventure, magic, and love.",
    story:
      "These started as songs for Abby and Alex specifically. Some are silly, some are earnest, most are both. They'll probably be embarrassed by them someday, and I hope they play them at my funeral.",
    brand: { accent: "#f59e0b", markText: "KIDS" },
    order: 8,
  },
  {
    id: "misc",
    name: "Misc",
    tagline: "Songs without a home.",
    description: "The ones that don't fit anywhere else.",
    story:
      "Every catalog has songs that don't belong to a specific era or persona. These are mine.",
    brand: { accent: "#6b7280", markText: "MISC" },
    order: 9,
  },
  {
    id: "septimus-adams",
    name: "Septimus Adams",
    tagline: "Drop in. Drift deep. Don't stop.",
    description:
      "Super dope banger dance club remixes — hypnotic, chill, and built to move.",
    story:
      "Septimus Adams is the side of me that lives on the dance floor at 2am. These are the remixes that hit different — synthpop, hypnotic grooves, club bangers with soul. If Saint Anthony writes from the quiet room, Septimus Adams writes from the strobe-lit dark.",
    brand: { accent: "#c026d3", markText: "SAd" },
    order: 4,
  },
  {
    id: "first-human",
    name: "First Human",
    tagline: "Before language, there was groove.",
    description:
      "Primal, instinctual songs stripped to the bone and built back up.",
    story:
      "First Human is the persona that predates the rest. No genre loyalty, no learned behavior — just the raw impulse to move, connect, and survive. These songs live somewhere between memory and instinct.",
    brand: { accent: "#ea580c", markText: "FH" },
    order: 5,
  },
];
