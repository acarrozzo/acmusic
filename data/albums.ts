export type StreamingLinks = {
  spotify?: string;
  appleMusic?: string;
  soundcloud?: string;
  youtube?: string;
};

export type Album = {
  id: string;
  groupId: string;
  title: string;
  year: number;
  description?: string;
  artwork: { src: string; alt?: string };
  links?: StreamingLinks;
  order: number;
};

export const albums: Album[] = [
  {
    id: "ss4st-drift",
    groupId: "strange-sounds-for-strange-times",
    title: "Drift",
    year: 2018,
    description:
      "My most recent collection of instrumentals. This album is currently my favorite.",
    artwork: { src: "/art/ss4st/drift.jpg", alt: "Drift album art" },
    links: {
      spotify: "https://open.spotify.com/album/4jQO9Oi8tdWgxB0XoSTrkV",
      appleMusic: "https://music.apple.com/us/album/drift/1378535108",
    },
    order: 1,
  },
  {
    id: "ss4st-bizarrr",
    groupId: "strange-sounds-for-strange-times",
    title: "Bizarrr",
    year: 2016,
    description: "A bit darker and stranger than the rest.",
    artwork: { src: "/art/ss4st/bizarrr.jpg", alt: "Bizarrr album art" },
    links: {
      spotify: "https://open.spotify.com/album/5NPZtvUeHQgeVSz2Zlw9Q3",
      appleMusic: "https://music.apple.com/us/album/bizarrr/1374545148",
    },
    order: 2,
  },
  {
    id: "ss4st-the-lost-instrumentals",
    groupId: "strange-sounds-for-strange-times",
    title: "The Lost Instrumentals",
    year: 2010,
    description:
      "Many tunes I recorded when I was much younger. A fun mix of rock and experimental electronic music.",
    artwork: {
      src: "/art/ss4st/the-lost-instrumentals.jpg",
      alt: "The Lost Instrumentals album art",
    },
    links: {
      spotify: "https://open.spotify.com/album/2prM0m05VnazrurH4uP92j",
      appleMusic:
        "https://music.apple.com/us/album/the-lost-instrumentals/1370079823",
    },
    order: 3,
  },
  {
    id: "bftz-demo",
    groupId: "banned-from-the-zoo",
    title: "The BFTZ Demo",
    year: 2012,
    description:
      "Four originals from a five-piece New York rock band, recorded in Brooklyn in 2012.",
    artwork: { src: "/art/bftz/the-bftz-demo.jpg", alt: "The BFTZ Demo album art" },
    links: {
      spotify: "https://open.spotify.com/album/45VI6lwPUh1wGTbQyOwBK9",
      soundcloud: "https://soundcloud.com/bftz/sets/bftz-demo",
      youtube: "https://www.youtube.com/user/BFTZlive/videos",
    },
    order: 4,
  },
];
