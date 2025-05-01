import React, { useEffect } from "react";

import TrackPlayer, {
  Progress,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useStore } from "../datbase/DatabaseProvider";
import { track1, track2 } from "./mock";

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

export type LocalSource = {
  url: string;
  cover?: string;
};

export type Source = {
  current: boolean;
} & (RemoteSource | LocalSource);

export const tracks = [track1, track2];

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
      // FIXME: this should be only called when we actually change the track / source
      if (loadTrack) {
        TrackPlayer.add([loadTrack]).catch((e) => {
          console.log("Error adding track", e);
        });
      }
      setTrack(book);
    });
    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const { id: trackId, progress: trackProgress } = track || {};

  // track progress, this can be debounced
  useEffect(() => {
    if (!trackId) return;
    if (
      state.state === State.Playing ||
      (state.state === State.Paused && progress.position > 0)
    ) {
      if (trackProgress !== progress.position) {
        const result = books.update(trackId, {
          status: "in_progress",
          progress: progress.position,
        });

        setTrack(result);
      }
    }
  }, [trackProgress, trackId, state.state, progress.position]);

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
