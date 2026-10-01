import { albums, type Album } from "./albums";
import type { Track } from "./tracks";

/**
 * Strange Sounds for Strange Times: the three released albums, all
 * instrumentals. Titles, durations and links match the Spotify / Apple Music
 * releases. A track's id (and so its /song URL) is "ss4st-" plus its file name
 * without the track number.
 */
type Row = {
  n: number;
  title: string;
  file: string;
  duration: number;
  spotify: string;
  apple: string;
  /** Replaces the placeholder blurb. */
  description?: string;
};

const albumTracks = (
  albumId: string,
  folder: string,
  genre: string,
  rows: Row[],
): Track[] => {
  const album = albums.find((a) => a.id === albumId) as Album;
  return rows.map((row) => ({
    id: `ss4st-${row.file.replace(/^\d+-/, "")}`,
    groupId: album.groupId,
    albumId,
    trackNumber: row.n,
    title: row.title,
    // Placeholder blurb until each song gets its own.
    description:
      row.description ?? `Instrumental from ${album.title} (${album.year}).`,
    tags: ["instrumental", genre],
    artwork: album.artwork,
    audio: { sunoCoverUrl: `/songs/ss4st/${folder}/${row.file}.mp3` },
    duration: row.duration,
    links: {
      spotify: `https://open.spotify.com/track/${row.spotify}`,
      appleMusic: `${album.links?.appleMusic}?i=${row.apple}`,
    },
    order: album.order * 100 + row.n,
  }));
};

export const ss4stTracks: Track[] = [
  ...albumTracks("ss4st-drift", "drift", "electronic", [
    { n: 1, title: "She Speaks", file: "01-she-speaks", duration: 73, spotify: "20L0j1iZyPRnE2EruzsMYO", apple: "1378535675" },
    { n: 2, title: "Polar", file: "02-polar", duration: 129, spotify: "5QrNsPnYcIQgY5MxwpLTAA", apple: "1378535676" },
    { n: 3, title: "40 Years", file: "03-40-years", duration: 103, spotify: "3ppLFlpSQhuiNPYlIcKTQf", apple: "1378535677" },
    { n: 4, title: "Einstein's Pipe", file: "04-einsteins-pipe", duration: 377, spotify: "2FMTuODLutkAJ4q1W1SG5t", apple: "1378535678" },
    { n: 5, title: "I Plant a Tree (It Grows Slow)", file: "05-i-plant-a-tree-it-grows-slow", duration: 374, spotify: "3OagIY44vsyEK91Bm5rxwb", apple: "1378535679" },
    { n: 6, title: "Kraken Vs. Dinosaur", file: "06-kraken-vs-dinosaur", duration: 182, spotify: "6tMPhWci1dPtK3AaKqdkyQ", apple: "1378535680" },
    { n: 7, title: "Proxima", file: "07-proxima", duration: 126, spotify: "6lRozkwzjLZoN0QqWoWDcW", apple: "1378535771" },
  ]),
  ...albumTracks("ss4st-bizarrr", "bizarrr", "electronic", [
    { n: 1, title: "Oneclip", file: "01-oneclip", duration: 88, spotify: "2mMIjOun6et4AlaIfy2VHo", apple: "1374545775" },
    { n: 2, title: "TooDark", file: "02-toodark", duration: 195, spotify: "2vJMqeK8cWHXzUiHYmSJ64", apple: "1374545776" },
    { n: 3, title: "Zombeatz", file: "03-zombeatz", duration: 107, spotify: "6Q01jYClH7vtccd4APKuAU", apple: "1374545777" },
    { n: 4, title: "Novella", file: "04-novella", duration: 145, spotify: "3x8VDz6EccWrmcBMcgFOEg", apple: "1374545778" },
    { n: 5, title: "Soda Pop!", file: "05-soda-pop", duration: 50, spotify: "0kin1w3ZBGH9tsJZdhdkGE", apple: "1374545779" },
    { n: 6, title: "Pop References", file: "06-pop-references", duration: 122, spotify: "4keFcAdRRAwJdNNWfQdihU", apple: "1374545780" },
    { n: 7, title: "Meanwhile Back on Earth", file: "07-meanwhile-back-on-earth", duration: 106, spotify: "6iL9giNtjCfE0JxirIf6Df", apple: "1374545781" },
  ]),
  // #27 "Photographs" is on the release but has no audio file here yet.
  ...albumTracks("ss4st-the-lost-instrumentals", "the-lost-instrumentals", "rock", [
    { n: 1, title: "In the Park", file: "01-in-the-park", duration: 135, spotify: "517nIlIa6cpvQedh0pFqhl", apple: "1370079835" },
    { n: 2, title: "Sunny", file: "02-sunny", duration: 108, spotify: "7anXowa0l07188c2R3EoPg", apple: "1370079836" },
    { n: 3, title: "Reborn", file: "03-reborn", duration: 149, spotify: "1jaSjNcrPOExkc6S7Ud3ts", apple: "1370079837" },
    { n: 4, title: "Caddy", file: "04-caddy", duration: 203, spotify: "38AC3jOSQjjsJDzFFyxi8H", apple: "1370079838" },
    { n: 5, title: "Squid", file: "05-squid", duration: 122, spotify: "4EueiTS2U4yHutFrxiYjKp", apple: "1370079839" },
    { n: 6, title: "Verse", file: "06-verse", duration: 88, spotify: "7t4cwImy1rSQ3XC8MGMmPE", apple: "1370079840" },
    { n: 7, title: "Cheesecake", file: "07-cheesecake", duration: 199, spotify: "1aKiDIC9UrzuOVom7YRJFd", apple: "1370079841" },
    { n: 8, title: "20,000 BC", file: "08-20000-bc", duration: 267, spotify: "0zr7r8bIIoDbFBHl7o4llj", apple: "1370079842" },
    { n: 9, title: "Weird", file: "09-weird", duration: 122, spotify: "3cn6XDTNqUyZCYz1TQ9zP3", apple: "1370079843" },
    { n: 10, title: "Soosh", file: "10-soosh", duration: 162, spotify: "1qiIs5sjWZMxfkcSeEngTJ", apple: "1370079844" },
    { n: 11, title: "Fire Truck", file: "11-fire-truck", duration: 174, spotify: "7uLdQywPEhXUWKGenx5ner", apple: "1370079845" },
    { n: 12, title: "RR", file: "12-rr", duration: 114, spotify: "08rHE4JJrxdQZrOTjWGKl6", apple: "1370079846" },
    { n: 13, title: "Backroads", file: "13-backroads", duration: 198, spotify: "3x3FYHhf7JONfm7f61BPSx", apple: "1370079847" },
    { n: 14, title: "Science", file: "14-science", duration: 88, spotify: "0k5wmcSl61YQffrz12hXRF", apple: "1370079848" },
    { n: 15, title: "Stage", file: "15-stage", duration: 359, spotify: "0M54AXZKuzwYqXRtRBoxrZ", apple: "1370079849" },
    { n: 16, title: "Ooc", file: "16-ooc", duration: 155, spotify: "2UHCrNznEMDLpslob53pwm", apple: "1370079850" },
    { n: 17, title: "T.T.W.Y.A.Part.0", file: "17-ttwya-part-0", duration: 202, spotify: "6zoSqPdafIrsfWQundmdcs", apple: "1370079971" },
    { n: 18, title: "Smash Mate", file: "18-smash-mate", duration: 327, spotify: "3GXRnEQ7PwhrSHvUSvJift", apple: "1370079972" },
    { n: 19, title: "Smash Chev", file: "19-smash-chev", duration: 178, spotify: "60Oe8HvPTMq63aGrBWD6kK", apple: "1370079973" },
    { n: 20, title: "Smash Mon", file: "20-smash-mon", duration: 246, spotify: "3WDDrGJ52qFWoezwlAz83Q", apple: "1370079974" },
    { n: 21, title: "Coop", file: "21-coop", duration: 183, spotify: "0Cs5lm7sriBlbnCfRoCsyk", apple: "1370079975" },
    { n: 22, title: "Phaser", file: "22-phaser", duration: 125, spotify: "6Nyw1i17YnrQ8HexUhnuoI", apple: "1370079976" },
    { n: 23, title: "Drippy", file: "23-drippy", duration: 157, spotify: "2FC6HsMzpD5tcJppIoc3Iw", apple: "1370079977" },
    { n: 24, title: "Challenge", file: "24-challenge", duration: 194, spotify: "4uoA49kOzSbRScrxNrSKqR", apple: "1370079978" },
    { n: 25, title: "Wha", file: "25-wha", duration: 524, spotify: "62ZW85Es8kGjvVl582SSbA", apple: "1370079979" },
    { n: 26, title: "Horns", file: "26-horns", duration: 96, spotify: "1RQQ0NI3I9aXU0bHHr5l7E", apple: "1370079980" },
    { n: 28, title: "Canon in V", file: "28-canon-in-v", duration: 141, spotify: "3vjfDwxPVD3YrHLbIsIQjK", apple: "1370079982" },
    { n: 29, title: "Changes", file: "29-changes", duration: 362, spotify: "7I4Ca9To0v84a6zyGEzGn4", apple: "1370079983" },
    { n: 30, title: "Jeremiah Rmx", file: "30-jeremiah-remix", duration: 74, spotify: "3Y31TZRYbMgPXGZ3RcjiUL", apple: "1370079984" },
  ]),
];
