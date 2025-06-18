import { Track } from "./PlayerProvider";

export const track5: Track = {
  id: "5",
  source: {
    remote: {
      current: true,
      url: "http://192.168.1.82:8080/endymion-2.mp3",
    },
  },
  title: "Endymion (2 / 2)",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  cover: "http://192.168.1.82:8080/endymion.jpg",
  authors: ["Dan Simmons"],
  synopsis:
    "Two hundred forty-seven years after the Fall of Hyperion (DB 33584), the WorldWeb is divided into many kingdoms, and the military wing of the Catholic Church is in charge. Aenea, eleven, emerges from the Time Tombs to challenge the church authorities. Raul Endymion is snatched from death to assist her.",
  duration: 11 * 3600 + 27 * 60 + 13,
  progress: 0,
  chapters: [
    { from: 0 * 3600 + 0 * 60 + 0, to: 0 * 3600 + 6 * 60 + 7, title: "(31)" },
    { from: 0 * 3600 + 6 * 60 + 7, to: 0 * 3600 + 14 * 60 + 1, title: "(32)" },
    {
      from: 0 * 3600 + 14 * 60 + 1,
      to: 0 * 3600 + 41 * 60 + 16,
      title: "(33)",
    },
    {
      from: 0 * 3600 + 41 * 60 + 16,
      to: 0 * 3600 + 35 * 60 + 12,
      title: "(34)",
    },
    {
      from: 0 * 3600 + 35 * 60 + 12,
      to: 0 * 3600 + 59 * 60 + 36,
      title: "(35)",
    },
    {
      from: 0 * 3600 + 59 * 60 + 36,
      to: 0 * 3600 + 22 * 60 + 49,
      title: "(36)",
    },
    {
      from: 0 * 3600 + 22 * 60 + 49,
      to: 0 * 3600 + 46 * 60 + 29,
      title: "(37)",
    },
    {
      from: 0 * 3600 + 46 * 60 + 29,
      to: 0 * 3600 + 20 * 60 + 44,
      title: "(38)",
    },
    {
      from: 0 * 3600 + 20 * 60 + 44,
      to: 0 * 3600 + 42 * 60 + 21,
      title: "(39)",
    },
    {
      from: 0 * 3600 + 42 * 60 + 21,
      to: 0 * 3600 + 57 * 60 + 9,
      title: "(40)",
    },
    {
      from: 0 * 3600 + 57 * 60 + 9,
      to: 0 * 3600 + 12 * 60 + 55,
      title: "(41)",
    },
    {
      from: 0 * 3600 + 12 * 60 + 55,
      to: 0 * 3600 + 26 * 60 + 31,
      title: "(42)",
    },
    {
      from: 0 * 3600 + 26 * 60 + 31,
      to: 0 * 3600 + 47 * 60 + 30,
      title: "(43)",
    },
    {
      from: 0 * 3600 + 47 * 60 + 30,
      to: 0 * 3600 + 3 * 60 + 17,
      title: "(44)",
    },
    {
      from: 0 * 3600 + 3 * 60 + 17,
      to: 0 * 3600 + 10 * 60 + 21,
      title: "(45)",
    },
    {
      from: 0 * 3600 + 10 * 60 + 21,
      to: 0 * 3600 + 32 * 60 + 52,
      title: "(46)",
    },
    {
      from: 0 * 3600 + 32 * 60 + 52,
      to: 0 * 3600 + 51 * 60 + 3,
      title: "(47)",
    },
    {
      from: 0 * 3600 + 51 * 60 + 3,
      to: 0 * 3600 + 22 * 60 + 24,
      title: "(48)",
    },
    {
      from: 0 * 3600 + 22 * 60 + 24,
      to: 0 * 3600 + 48 * 60 + 45,
      title: "(49)",
    },
    { from: 0 * 3600 + 48 * 60 + 45, to: 0 * 3600 + 6 * 60 + 3, title: "(50)" },
    { from: 0 * 3600 + 6 * 60 + 3, to: 0 * 3600 + 17 * 60 + 48, title: "(51)" },
    {
      from: 0 * 3600 + 17 * 60 + 48,
      to: 0 * 3600 + 32 * 60 + 49,
      title: "(52)",
    },
    {
      from: 0 * 3600 + 32 * 60 + 49,
      to: 0 * 3600 + 44 * 60 + 32,
      title: "(53)",
    },
    {
      from: 0 * 3600 + 44 * 60 + 32,
      to: 10 * 3600 + 10 * 60 + 3,
      title: "(54)",
    },
    {
      from: 10 * 3600 + 10 * 60 + 3,
      to: 10 * 3600 + 41 * 60 + 7,
      title: "(55)",
    },
    {
      from: 10 * 3600 + 41 * 60 + 7,
      to: 10 * 3600 + 46 * 60 + 0,
      title: "(56)",
    },
    {
      from: 10 * 3600 + 46 * 60 + 0,
      to: 10 * 3600 + 0 * 60 + 47,
      title: "(57)",
    },
    {
      from: 10 * 3600 + 0 * 60 + 47,
      to: 10 * 3600 + 15 * 60 + 55,
      title: "(58)",
    },
    {
      from: 10 * 3600 + 15 * 60 + 55,
      to: 10 * 3600 + 20 * 60 + 51,
      title: "(59)",
    },
    {
      from: 10 * 3600 + 20 * 60 + 51,
      to: 11 * 3600 + 27 * 60 + 13,
      title: "(60)",
    },
  ],
};

export const track4: Track = {
  id: "4",
  source: {
    remote: {
      current: true,
      url: "http://192.168.1.82:8080/endymion-1.mp3",
    },
  },
  title: "Endymion (1 / 2)",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  cover: "http://192.168.1.82:8080/endymion.jpg",
  authors: ["Dan Simmons"],
  synopsis:
    "Two hundred forty-seven years after the Fall of Hyperion (DB 33584), the WorldWeb is divided into many kingdoms, and the military wing of the Catholic Church is in charge. Aenea, eleven, emerges from the Time Tombs to challenge the church authorities. Raul Endymion is snatched from death to assist her.",
  duration: 10 * 3600 + 41 * 60 + 16,
  progress: 0,
  chapters: [
    {
      from: 0 * 3600 + 0 * 60 + 0,
      to: 0 * 3600 + 3 * 60 + 4,
      title: "(i) Book info",
    },
    { from: 0 * 3600 + 3 * 60 + 4, to: 0 * 3600 + 9 * 60 + 41, title: "(1)" },
    { from: 0 * 3600 + 9 * 60 + 41, to: 0 * 3600 + 34 * 60 + 4, title: "(2)" },
    { from: 0 * 3600 + 34 * 60 + 4, to: 0 * 3600 + 43 * 60 + 16, title: "(3)" },
    { from: 0 * 3600 + 43 * 60 + 16, to: 1 * 3600 + 17 * 60 + 4, title: "(4)" },
    { from: 1 * 3600 + 17 * 60 + 4, to: 1 * 3600 + 29 * 60 + 31, title: "(5)" },
    {
      from: 1 * 3600 + 29 * 60 + 31,
      to: 1 * 3600 + 56 * 60 + 35,
      title: "(6)",
    },
    {
      from: 1 * 3600 + 56 * 60 + 35,
      to: 2 * 3600 + 10 * 60 + 28,
      title: "(7)",
    },
    {
      from: 2 * 3600 + 10 * 60 + 28,
      to: 2 * 3600 + 48 * 60 + 25,
      title: "(8)",
    },
    { from: 2 * 3600 + 48 * 60 + 25, to: 3 * 3600 + 23 * 60 + 4, title: "(9)" },
    {
      from: 3 * 3600 + 23 * 60 + 4,
      to: 3 * 3600 + 46 * 60 + 15,
      title: "(10)",
    },
    {
      from: 3 * 3600 + 46 * 60 + 15,
      to: 3 * 3600 + 58 * 60 + 34,
      title: "(11)",
    },
    {
      from: 3 * 3600 + 58 * 60 + 34,
      to: 4 * 3600 + 15 * 60 + 8,
      title: "(12)",
    },
    {
      from: 4 * 3600 + 15 * 60 + 8,
      to: 4 * 3600 + 26 * 60 + 11,
      title: "(13)",
    },
    {
      from: 4 * 3600 + 26 * 60 + 11,
      to: 4 * 3600 + 47 * 60 + 0,
      title: "(14)",
    },
    {
      from: 4 * 3600 + 47 * 60 + 0,
      to: 4 * 3600 + 58 * 60 + 43,
      title: "(15)",
    },
    {
      from: 4 * 3600 + 58 * 60 + 43,
      to: 5 * 3600 + 11 * 60 + 20,
      title: "(16)",
    },
    {
      from: 5 * 3600 + 11 * 60 + 20,
      to: 5 * 3600 + 24 * 60 + 25,
      title: "(17)",
    },
    {
      from: 5 * 3600 + 24 * 60 + 25,
      to: 5 * 3600 + 30 * 60 + 53,
      title: "(18)",
    },
    {
      from: 5 * 3600 + 30 * 60 + 53,
      to: 5 * 3600 + 52 * 60 + 53,
      title: "(19)",
    },
    {
      from: 5 * 3600 + 52 * 60 + 53,
      to: 6 * 3600 + 8 * 60 + 28,
      title: "(20)",
    },
    {
      from: 6 * 3600 + 8 * 60 + 28,
      to: 6 * 3600 + 28 * 60 + 56,
      title: "(21)",
    },
    {
      from: 6 * 3600 + 28 * 60 + 56,
      to: 6 * 3600 + 41 * 60 + 10,
      title: "(22)",
    },
    {
      from: 6 * 3600 + 41 * 60 + 10,
      to: 6 * 3600 + 55 * 60 + 4,
      title: "(23)",
    },
    {
      from: 6 * 3600 + 55 * 60 + 4,
      to: 7 * 3600 + 14 * 60 + 19,
      title: "(24)",
    },
    {
      from: 7 * 3600 + 14 * 60 + 19,
      to: 7 * 3600 + 52 * 60 + 42,
      title: "(25)",
    },
    {
      from: 7 * 3600 + 52 * 60 + 42,
      to: 8 * 3600 + 16 * 60 + 28,
      title: "(26)",
    },
    {
      from: 8 * 3600 + 16 * 60 + 28,
      to: 8 * 3600 + 50 * 60 + 37,
      title: "(27)",
    },
    {
      from: 8 * 3600 + 50 * 60 + 37,
      to: 9 * 3600 + 3 * 60 + 21,
      title: "(28)",
    },
    {
      from: 9 * 3600 + 3 * 60 + 21,
      to: 9 * 3600 + 47 * 60 + 38,
      title: "(29)",
    },
    {
      from: 9 * 3600 + 47 * 60 + 38,
      to: 10 * 3600 + 41 * 60 + 16,
      title: "(30)",
    },
  ],
};

export const track3: Track = {
  id: "3",
  source: {
    remote: {
      current: true,
      url: "http://192.168.1.82:8080/fall-of-hyperion-2.mp3",
    },
  },
  title: "Fall of Hyperion (2 / 2)",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  cover: "http://192.168.1.82:8080/fall-of-hyperion.jpg",
  authors: ["Dan Simmons"],
  synopsis: "",
  duration: 10 * 3600 + 3 * 60 + 41,
  progress: 0,
  chapters: [
    {
      from: 0 * 3600 + 0 * 60 + 0,
      to: 0 * 3600 + 45 * 60 + 42,
      title: "(xxxii)",
    },
    {
      from: 0 * 3600 + 45 * 60 + 42,
      to: 1 * 3600 + 15 * 60 + 37,
      title: "(xxxiii)",
    },
    {
      from: 1 * 3600 + 15 * 60 + 37,
      to: 2 * 3600 + 5 * 60 + 0,
      title: "(xxxiv)",
    },
    {
      from: 2 * 3600 + 5 * 60 + 0,
      to: 2 * 3600 + 33 * 60 + 3,
      title: "(xxxv)",
    },
    {
      from: 2 * 3600 + 33 * 60 + 3,
      to: 3 * 3600 + 17 * 60 + 25,
      title: "(xxxvi)",
    },
    {
      from: 3 * 3600 + 17 * 60 + 25,
      to: 4 * 3600 + 4 * 60 + 53,
      title: "(xxxvii)",
    },
    {
      from: 4 * 3600 + 4 * 60 + 53,
      to: 4 * 3600 + 43 * 60 + 10,
      title: "(xxxviii)",
    },
    {
      from: 4 * 3600 + 43 * 60 + 10,
      to: 5 * 3600 + 29 * 60 + 55,
      title: "(xxxix)",
    },
    {
      from: 5 * 3600 + 29 * 60 + 55,
      to: 5 * 3600 + 54 * 60 + 21,
      title: "(xl)",
    },
    {
      from: 5 * 3600 + 54 * 60 + 21,
      to: 6 * 3600 + 25 * 60 + 56,
      title: "(xli)",
    },
    {
      from: 6 * 3600 + 25 * 60 + 56,
      to: 7 * 3600 + 19 * 60 + 37,
      title: "(xlii)",
    },
    {
      from: 7 * 3600 + 19 * 60 + 37,
      to: 8 * 3600 + 21 * 60 + 22,
      title: "(xliii)",
    },
    {
      from: 8 * 3600 + 21 * 60 + 22,
      to: 8 * 3600 + 53 * 60 + 41,
      title: "(xliv)",
    },
    {
      from: 8 * 3600 + 53 * 60 + 41,
      to: 9 * 3600 + 35 * 60 + 35,
      title: "(xlv)",
    },
    {
      from: 9 * 3600 + 35 * 60 + 35,
      to: 10 * 3600 + 3 * 60 + 41,
      title: "(xlvi)",
    },
  ],
};

export const track2: Track = {
  id: "2",
  source: {
    remote: {
      current: true,
      url: "http://192.168.1.82:8080/fal-of-hyperion-1.mp3",
    },
  },
  title: "Fall of Hyperion (1 / 2)",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  cover: "http://192.168.1.82:8080/fall-of-hyperion.jpg",
  authors: ["Dan Simmons"],
  synopsis: "",
  duration: 9 * 3600 + 35 * 60 + 41,
  progress: 0,
  chapters: [
    {
      from: 0 * 3600 + 0 * 60 + 0,
      to: 0 * 3600 + 2 * 60 + 14,
      title: "(i) Book info",
    },
    {
      from: 0 * 3600 + 2 * 60 + 14,
      to: 0 * 3600 + 17 * 60 + 32,
      title: "(01)",
    },
    {
      from: 0 * 3600 + 17 * 60 + 32,
      to: 0 * 3600 + 38 * 60 + 11,
      title: "(02)",
    },
    {
      from: 0 * 3600 + 38 * 60 + 11,
      to: 1 * 3600 + 2 * 60 + 43,
      title: "(03)",
    },
    {
      from: 1 * 3600 + 2 * 60 + 43,
      to: 1 * 3600 + 27 * 60 + 52,
      title: "(04)",
    },
    {
      from: 1 * 3600 + 27 * 60 + 52,
      to: 1 * 3600 + 38 * 60 + 10,
      title: "(05)",
    },
    {
      from: 1 * 3600 + 38 * 60 + 10,
      to: 1 * 3600 + 55 * 60 + 16,
      title: "(06)",
    },
    {
      from: 1 * 3600 + 55 * 60 + 16,
      to: 2 * 3600 + 15 * 60 + 4,
      title: "(07)",
    },
    { from: 2 * 3600 + 15 * 60 + 4, to: 2 * 3600 + 37 * 60 + 5, title: "(08)" },
    { from: 2 * 3600 + 37 * 60 + 5, to: 3 * 3600 + 3 * 60 + 35, title: "(09)" },
    { from: 3 * 3600 + 3 * 60 + 35, to: 3 * 3600 + 7 * 60 + 37, title: "(10)" },
    {
      from: 3 * 3600 + 7 * 60 + 37,
      to: 3 * 3600 + 35 * 60 + 23,
      title: "(11)",
    },
    {
      from: 3 * 3600 + 35 * 60 + 23,
      to: 3 * 3600 + 40 * 60 + 8,
      title: "(12)",
    },
    {
      from: 3 * 3600 + 40 * 60 + 8,
      to: 3 * 3600 + 52 * 60 + 15,
      title: "(13)",
    },
    {
      from: 3 * 3600 + 52 * 60 + 15,
      to: 4 * 3600 + 15 * 60 + 58,
      title: "(14)",
    },
    {
      from: 4 * 3600 + 15 * 60 + 58,
      to: 4 * 3600 + 46 * 60 + 5,
      title: "(15)",
    },
    { from: 4 * 3600 + 46 * 60 + 5, to: 5 * 3600 + 9 * 60 + 16, title: "(16)" },
    {
      from: 5 * 3600 + 9 * 60 + 16,
      to: 5 * 3600 + 24 * 60 + 33,
      title: "(17)",
    },
    {
      from: 5 * 3600 + 24 * 60 + 33,
      to: 5 * 3600 + 56 * 60 + 27,
      title: "(18)",
    },
    {
      from: 5 * 3600 + 56 * 60 + 27,
      to: 6 * 3600 + 10 * 60 + 28,
      title: "(19)",
    },
    {
      from: 6 * 3600 + 10 * 60 + 28,
      to: 6 * 3600 + 22 * 60 + 34,
      title: "(20)",
    },
    {
      from: 6 * 3600 + 22 * 60 + 34,
      to: 6 * 3600 + 35 * 60 + 36,
      title: "(21)",
    },
    {
      from: 6 * 3600 + 35 * 60 + 36,
      to: 6 * 3600 + 52 * 60 + 10,
      title: "(22)",
    },
    {
      from: 6 * 3600 + 52 * 60 + 10,
      to: 7 * 3600 + 2 * 60 + 23,
      title: "(23)",
    },
    { from: 7 * 3600 + 2 * 60 + 23, to: 7 * 3600 + 24 * 60 + 8, title: "(24)" },
    {
      from: 7 * 3600 + 24 * 60 + 8,
      to: 7 * 3600 + 47 * 60 + 31,
      title: "(25)",
    },
    {
      from: 7 * 3600 + 47 * 60 + 31,
      to: 7 * 3600 + 56 * 60 + 14,
      title: "(26)",
    },
    {
      from: 7 * 3600 + 56 * 60 + 14,
      to: 8 * 3600 + 3 * 60 + 39,
      title: "(27)",
    },
    {
      from: 8 * 3600 + 3 * 60 + 39,
      to: 8 * 3600 + 28 * 60 + 20,
      title: "(28)",
    },
    {
      from: 8 * 3600 + 28 * 60 + 20,
      to: 8 * 3600 + 57 * 60 + 11,
      title: "(29)",
    },
    {
      from: 8 * 3600 + 57 * 60 + 11,
      to: 9 * 3600 + 13 * 60 + 36,
      title: "(30)",
    },
    {
      from: 9 * 3600 + 13 * 60 + 36,
      to: 9 * 3600 + 35 * 60 + 41,
      title: "(31)",
    },
  ],
};

export const track1: Track = {
  id: "1",
  source: {
    remote: {
      current: true,
      url: "http://192.168.1.82:8080/book.mp3",
    },
  },
  title: "Hyperion",
  cover: "http://192.168.1.82:8080/hyperion.jpg",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  authors: ["Dan Simmons"],
  synopsis:
    "The novel begins with the Consul receiving a message from Hegemony CEO Meina Gladstone that he is to return to the planet Hyperion as a member of the Shrike Pilgrimage. It is explained that the Time Tombs on Hyperion appear to be opening and an Ouster fleet is approaching the system, although their intentions are unknown. Gladstone also explains that one of the pilgrims is suspected to be an agent of the Ousters, but they don't know which one. The Consul is to meet up with the Templar tree ship Yggdrasill along with the other pilgrims on his journey to the Outback planet. ",
  duration: 8 * 60 * 60 + 25 * 60 + 19,
  progress: 0,
  chapters: [
    { from: 0, to: 2 * 60 + 7, title: "Book info" },
    { from: 2 * 60 + 7 + 1, to: 13 * 60 + 9, title: "Prologue" },
    { from: 13 * 60 + 9, to: 48 * 60 + 21, title: "Hyperion 01" },
    {
      from: 48 * 60 + 21 + 1,
      to: 3 * 60 * 60 + 35 * 60 + 35,
      title: "The Priest`s Tale",
    },
    {
      from: 3 * 60 * 60 + 35 * 60 + 35 + 1,
      to: 4 * 60 * 60 + 14 * 60 + 22,
      title: "Hyperion 02",
    },
    {
      from: 4 * 60 * 60 + 14 * 60 + 22 + 1,
      to: 6 * 60 * 60 + 14 * 60 + 33,
      title: "The Soldier`s Tale",
    },
    {
      from: 6 * 60 * 60 + 14 * 60 + 33 + 1,
      to: 6 * 60 * 60 + 19 * 60 + 47,
      title: "Hyperion 03",
    },
    {
      from: 6 * 60 * 60 + 19 * 60 + 47 + 1,
      to: 8 * 60 * 60 + 25 * 60 + 19,
      title: "The Poet`s Tale",
    },
  ],
};
