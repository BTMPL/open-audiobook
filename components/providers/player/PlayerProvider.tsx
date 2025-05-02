import React, { useEffect, useRef, useState } from "react";

import TrackPlayer, {
  AddTrack,
  Event,
  PlaybackState,
  Progress,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useStore } from "../datbase/DatabaseProvider";
import { track1, track2 } from "./mock";
import { AppState } from "../app/AppProvider";

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
  add: (
    tracks: AddTrack,
    options?: { playOnLoad?: boolean }
  ) => Promise<number | void>;
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
  const appState = useStore<AppState>("appState");

  const [bookId, setBookId] = React.useState<string | undefined>(
    appState.byId("appState")?.track
  );
  const [track, setTrack] = React.useState<Track | undefined>();

  const progress = useProgress();
  const books = useStore<Track>("books");
  const state = usePlaybackState();

  useEffect(() => {
    const unsub = appState.byId$("appState", (state) => {
      setBookId(state.track);
    });

    TrackPlayer.setupPlayer();
    return () => {
      TrackPlayer.stop();
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!bookId) return;
    setTrack(books.byId(bookId));
    return books.byId$(bookId, (book) => {
      setTrack(book);
    });
  }, [bookId]);

  const { id: trackId, progress: trackProgress } = track || {};

  useEffect(() => {
    // FIXME: this should be only called when we actually change the track / source
    if (!track) return;
    const loadTrack = Object.values(track.source).find((s) => s.current);
    if (!loadTrack) return;
    TrackPlayer.add([loadTrack]).catch((e) => {
      console.log("Error adding track", e);
    });
  }, [trackId]);

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
          lastPlayedAt: Date.now(),
        });

        setTrack(result);
      }
    }
  }, [trackProgress, trackId, state.state, progress.position]);

  return (
    <PlayerContext.Provider
      value={{
        progress,
        add: (track: AddTrack, options = {}) => {
          TrackPlayer.stop();
          if (options.playOnLoad) {
            const playbackWhenReady = (data: any) => {
              console.log(data);
            };
            TrackPlayer.addEventListener(
              Event.PlaybackActiveTrackChanged,
              playbackWhenReady
            );
          }
          console.log({ tracks });
          const queue = TrackPlayer.load(track).then((queue) => {
            if (options.playOnLoad) {
              TrackPlayer.play();
            }
            return queue;
          });

          return queue;
        },
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
