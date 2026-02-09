export type Track = {
  id: string;
  groupId: string;
  title: string;
  description: string;
  tags: string[];
  artwork: {
    src: string;
    alt?: string;
  };
  audio: {
    sunoCoverUrl: string;
    originalUrl?: string;
  };
  lyrics?: {
    text: string;
  };
  originalRef?: {
    year: number;
    description: string;
  };
  releaseDate?: string;
  downloads?: {
    allow: boolean;
    filename?: string;
  };
  order?: number;
};

export const tracks: Track[] = [
  {
    id: "cr-ashen-halo",
    groupId: "caravaggios-revenge",
    title: "Ashen Halo",
    description: "A baroque pulse with a luminous, modern chorus.",
    tags: ["baroque-pop", "dark", "anthemic"],
    artwork: {
      src: "/songs/Placeholder/placeholder.png",
      alt: "Ashen Halo artwork placeholder",
    },
    audio: {
      sunoCoverUrl: "/songs/Placeholder/placeholder.mp3",
      originalUrl: "/songs/Placeholder/placeholder.mp3",
    },
    lyrics: {
      text:
        "Ash in the halo, light in the wire\n" +
        "Carry me slowly through the fire\n" +
        "I wrote this room in the dark of the choir\n" +
        "Now it wakes with a midnight desire",
    },
    originalRef: {
      year: 2013,
      description: "Original demo recorded on a four-track in Oakland.",
    },
    releaseDate: "2025-11-04",
    downloads: { allow: true, filename: "ashen-halo.mp3" },
    order: 1,
  },
  {
    id: "cr-gilded-static",
    groupId: "caravaggios-revenge",
    title: "Gilded Static",
    description: "Strings and synths collide in slow motion.",
    tags: ["cinematic", "strings", "lush"],
    artwork: {
      src: "/songs/Placeholder/placeholder.png",
      alt: "Gilded Static artwork placeholder",
    },
    audio: {
      sunoCoverUrl: "/songs/Placeholder/placeholder.mp3",
    },
    lyrics: {
      text:
        "Gold in the static, hum in the seam\n" +
        "Fold the horizon into a dream\n" +
        "Hold my name in the pull of the beam",
    },
    releaseDate: "2025-08-19",
    downloads: { allow: true, filename: "gilded-static.mp3" },
    order: 2,
  },
  {
    id: "cr-hold-my-breath-forever",
    groupId: "caravaggios-revenge",
    title: "Hold my Breath Forever",
    description: "Baroque drama with a suspended, breath-held hook.",
    tags: ["baroque", "dramatic", "anthemic"],
    artwork: {
      src: "/songs/Hold my Breath Forever/holdmybreathforever.png",
      alt: "Hold my Breath Forever artwork",
    },
    audio: {
      sunoCoverUrl:
        "/songs/Hold my Breath Forever/Hold my Breath Forever - 2-1- (50,50,25)-D-P-NEW lyric structure.mp3",
      originalUrl:
        "/songs/Hold my Breath Forever/original-cr-Hold my Breath Forever.mp3",
    },
    lyrics: {
      text:
        "Hold my breath forever, count the spark\n" +
        "Freeze the light beneath the mark\n" +
        "Let the silence keep the dark",
    },
    originalRef: {
      year: 2014,
      description: "Original demo recorded in a late-night session.",
    },
    downloads: { allow: true, filename: "hold-my-breath-forever.mp3" },
    order: 3,
  },
  {
    id: "sa-slow-altar",
    groupId: "saint-anthony",
    title: "Slow Altar",
    description: "Warm organ tones and a patient, devotional refrain.",
    tags: ["ambient", "sacred", "slow"],
    artwork: {
      src: "/songs/Placeholder/placeholder.png",
      alt: "Slow Altar artwork placeholder",
    },
    audio: {
      sunoCoverUrl: "/songs/Placeholder/placeholder.mp3",
    },
    lyrics: {
      text:
        "Slow altar, candle weight\n" +
        "Light the room and lower the gate\n" +
        "Hold the silence, hold the fate",
    },
    releaseDate: "2026-01-05",
    downloads: { allow: true, filename: "slow-altar.mp3" },
    order: 1,
  },
  {
    id: "sa-mirror-vespers",
    groupId: "saint-anthony",
    title: "Mirror Vespers",
    description: "A late-night hymn with glassy harmonics.",
    tags: ["hymn", "glass", "minimal"],
    artwork: {
      src: "/songs/Placeholder/placeholder.png",
      alt: "Mirror Vespers artwork placeholder",
    },
    audio: {
      sunoCoverUrl: "/songs/Placeholder/placeholder.mp3",
      originalUrl: "/songs/Placeholder/placeholder.mp3",
    },
    lyrics: {
      text:
        "Mirror vespers, hold the line\n" +
        "Every note a slow design\n" +
        "Let it bend and let it shine",
    },
    originalRef: {
      year: 2010,
      description: "Original recording tracked on a borrowed upright piano.",
    },
    releaseDate: "2025-10-10",
    downloads: { allow: true, filename: "mirror-vespers.mp3" },
    order: 2,
  },
  {
    id: "sa-she-knows",
    groupId: "saint-anthony",
    title: "She Knows",
    description: "Trip-hop pulse with a soft metallic chorus.",
    tags: ["trip-hop", "moody", "metallic"],
    artwork: {
      src: "/songs/She Knows/sheknows.png",
      alt: "She Knows artwork",
    },
    audio: {
      sunoCoverUrl:
        "/songs/She Knows/She Knows - 2-7 - TRIPHOPMETALCORE- (50,50) - D - new voice style test.mp3",
    },
    lyrics: {
      text:
        "She knows the frame, she knows the light\n" +
        "Metal rain in velvet night\n" +
        "Hold the line and hold me tight",
    },
    downloads: { allow: true, filename: "she-knows.mp3" },
    order: 3,
  },
  {
    id: "oe-tilt-the-floor",
    groupId: "odd-emcee",
    title: "Tilt the Floor",
    description: "A kinetic rap cut with skewed drum patterns.",
    tags: ["hip-hop", "off-kilter", "rhythmic"],
    artwork: {
      src: "/songs/Placeholder/placeholder.png",
      alt: "Tilt the Floor artwork placeholder",
    },
    audio: {
      sunoCoverUrl: "/songs/Placeholder/placeholder.mp3",
    },
    lyrics: {
      text:
        "Tilt the floor, I move in code\n" +
        "Every bar a compass road\n" +
        "Kick the door, the rhythm owed",
    },
    releaseDate: "2025-09-23",
    downloads: { allow: true, filename: "tilt-the-floor.mp3" },
    order: 1,
  },
];
