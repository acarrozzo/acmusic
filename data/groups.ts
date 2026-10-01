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
    tagline: "Handcrafted sound",
    description:
      "Strange Sounds for Strange Times — three albums of instrumentals, 100% hand made and hand edited.",
    story:
      "Strange Sounds for Strange Times is my solo instrumentalproject: the tunes I made for fun, in Garage Band and Logic, with too many guitars, a few basses, an uke, a banjo and a midi keyboard. Strings, synths, beats and all sorts of strange sounds. Between 2010 and 2018 I gathered more than forty of them into three albums, The Lost Instrumentals, Bizarrr and Drift, and put them up on Spotify, Apple Music and the rest. Every note here is 100% hand edited, played, programmed and mixed by me, long before AI had anything to do with music. No lyrics, no vocals, just some strange sounds for these strange times.",
    brand: { accent: "#8b7cff", markText: "SS" },
    order: 6,
  },
  {
    id: "banned-from-the-zoo",
    name: "Banned from the Zoo",
    tagline: "Wild sounds from the outside.",
    description:
      "A five-piece New York rock band, 2010 to 2015. Real amps, real drums, one four-song demo.",
    story:
      "Banned from the Zoo was five of us playing rock shows around New York City from 2010 to 2015, me on bass. In 2012 we went into a Brooklyn studio and cut the four songs we'd been playing live, The BFTZ Demo. It's the loudest thing in this catalog and the only part of it recorded as a band, all live players and zero AI.",
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
    id: "odd-emcee",
    name: "Odd Emcee",
    tagline: "Too many syllables, all of them on purpose.",
    description:
      "Hip-hop from a strange angle: storytelling raps, comedy, and rhymes that take the long way around.",
    story:
      "Welcome to this side of this odd emcee. This is where I rap: stories, jokes, a caveman flexing for a girl, whatever the beat asks for. I've been writing rhymes since the notebook days, and these are the ones that only ever worked out loud.",
    brand: { accent: "#2dd4bf", markText: "OE" },
    order: 5,
  },
];
