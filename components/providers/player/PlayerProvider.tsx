import React, { useEffect } from "react";

import TrackPlayer, {
  Progress,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useStore } from "../datbase/DatabaseProvider";

export type Chapter = {
  from: number;
  to: number;
  title: string;
};

export type Track = {
  id: string;
  source: Partial<Record<SourceType, Source>>;
  title: string;
  authors: string[];
  status: TrackStatus;
  cover: string;
  synopsis: string;
  duration: number;
  progress: number;
  chapters: Chapter[];
  addedAt: number;
  lastPlayedAt: number;
};

export type SourceType = "remote" | "local";

export type TrackStatus = "not_started" | "in_progress" | "finished";

export type RemoteSource = {
  url: string;
};

export type Source = {
  current: boolean;
  position: number;
} & RemoteSource;

const track1: Track = {
  id: "1",
  source: {
    remote: {
      current: true,
      position: 0,
      url: "http://127.0.0.1:8080/book.mp3",
    },
  },
  title: "Hyperion",
  cover: "http://127.0.0.1:8080/hyperion.jpg",
  addedAt: Date.now(),
  lastPlayedAt: Date.now(),
  status: "not_started",
  authors: ["Dan Simmons"],
  synopsis:
    "The novel begins with the Consul receiving a message from Hegemony CEO Meina Gladstone that he is to return to the planet Hyperion as a member of the Shrike Pilgrimage. It is explained that the Time Tombs on Hyperion appear to be opening and an Ouster fleet is approaching the system, although their intentions are unknown. Gladstone also explains that one of the pilgrims is suspected to be an agent of the Ousters, but they don't know which one. The Consul is to meet up with the Templar tree ship Yggdrasill along with the other pilgrims on his journey to the Outback planet. ",
  duration: 8 * 60 * 60 + 25 * 60 + 19,
  progress: 1,
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

export const tracks = [track1, track1, track1, track1, track1, track1, track1];

export function findChapter(chapters: Chapter[], currentTime: number): Chapter {
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    if (currentTime >= chapter.from && currentTime <= chapter.to) {
      return chapter;
    }
  }

  return chapters[0];
}

export const PlayerContext = React.createContext<{
  progress: Progress;
  track: Track | undefined;
  add: typeof TrackPlayer.add;
  seekBy: (position: number) => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  stop: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  state?: State;
}>({
  track: undefined,
  progress: {
    position: 0,
    duration: 0,
    buffered: 0,
  },
  add: () => Promise.resolve(),
  seekBy: () => Promise.resolve(),
  seekTo: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  play: () => Promise.resolve(),
  pause: () => Promise.resolve(),
  state: State.None,
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [track, setTrack] = React.useState<Track | undefined>();

  const progress = useProgress();
  const books = useStore<Track>("books");
  const state = usePlaybackState();

  useEffect(() => {
    TrackPlayer.setupPlayer();

    books.byId$("1", (book) => {
      const loadTrack = Object.values(book.source).find((s) => s.current);
      if (loadTrack) TrackPlayer.add([loadTrack]);
      setTrack(book);
    });
    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const { id: trackId, status, progress: trackProgress } = track || {};

  // track progress, this can be debounced
  useEffect(() => {
    if (!trackId) return;
    if (
      state.state === State.Stopped ||
      state.state === State.Paused ||
      state.state === State.Playing
    ) {
      if (trackProgress !== progress.position) {
        console.log(`updating progress of ${trackId} to ${progress.position}`);
        const result = books.update(trackId, {
          status: "in_progress",
          progress: progress.position,
        });

        console.log(result.status);
        setTrack(result);
      }
    }
  }, [trackProgress, trackId, state.state, progress.position]);

  console.log(track?.progress);

  return (
    <PlayerContext.Provider
      value={{
        progress,
        add: TrackPlayer.add,
        seekBy: TrackPlayer.seekBy,
        seekTo: TrackPlayer.seekTo,
        stop: TrackPlayer.stop,
        play: TrackPlayer.play,
        pause: TrackPlayer.pause,
        track,
        state: state.state,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return React.useContext(PlayerContext);
};
