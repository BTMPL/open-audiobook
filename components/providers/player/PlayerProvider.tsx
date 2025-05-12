import React, { useEffect } from "react";

import TrackPlayer, {
  Capability,
  Event,
  Progress,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useStore } from "../datbase/DatabaseProvider";
import { track1, track2 } from "./mock";
import { AppState } from "../app/AppProvider";
import { getCoverUri } from "@/utils/getCoverUri";
import { getTrackUrl } from "@/utils/getTrackUrl";

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

type BookTrack = {
  url: string;
  title: string;
  artist: string;
  cover: string;
};

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
  set: (track: Track, options?: { playOnLoad?: boolean }) => void;
  seekBy: (position: number) => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  stop: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  playbackRate: number;
  setPlaybackSpeed: (speed: number) => Promise<void>;
  state?: State;
}>({
  track: undefined,
  progress: {
    position: 0,
    duration: 0,
    buffered: 0,
  },
  set: () => Promise.resolve(),
  seekBy: () => Promise.resolve(),
  seekTo: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  play: () => Promise.resolve(),
  pause: () => Promise.resolve(),
  playbackRate: 1,
  setPlaybackSpeed: () => Promise.resolve(),
  state: State.None,
});

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () =>
    TrackPlayer.seekBy(15)
  );
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () =>
    TrackPlayer.seekBy(-15)
  );
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const appState = useStore<AppState>("appState");

  const [track, setTrack] = React.useState<Track | undefined>();
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const progress = useProgress();
  const books = useStore<Track>("books");
  const state = usePlaybackState();

  useEffect(() => {
    const unsub = appState.byId$(
      "appState",
      ({ track, playbackRate }) => {
        if (track) {
          setTrack(books.byId(track));
        }
        if (playbackRate) {
          TrackPlayer.setRate(playbackRate);
          setPlaybackRate(playbackRate);
        }
      },
      true
    );

    TrackPlayer.setupPlayer();
    TrackPlayer.registerPlaybackService(() => PlaybackService);

    TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
    });
    return () => {
      TrackPlayer.stop();
      unsub();
    };
  }, []);

  /**
   * Synchronize player to the app state, which holds information about the current track.
   * We are only using trackId as a dependency in the hook, because the track object is constantly
   * updated with the progress, and we don't want to trigger the effect every time.
   */
  const { id: trackId, progress: trackProgress } = track || {};
  useEffect(() => {
    if (!track) return;
    const url = getTrackUrl(track);
    if (!url) return;

    console.log("Loading track", trackId, url);
    TrackPlayer.load({
      title: track.title,
      artist: track.authors.join(", "),
      artwork: getCoverUri(track),
      url,
    })
      .then(() => {
        console.log("seek to", track.progress);
        TrackPlayer.seekTo(track.progress);
      })
      .catch((e) => {
        console.log("Error adding track", e);
      });
  }, [trackId]);

  /**
   * Synchronize progress with the player state, this can probably be optimised
   * so that we don't update the DB every single second; maybe debounce it a bit?
   */
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

  const play = () => {
    TrackPlayer.setRate(appState?.byId("appState")?.playbackRate || 1);
    return TrackPlayer.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        progress,
        set: ({ id }: Track, options = {}) => {
          if (options.playOnLoad) TrackPlayer.pause();
          appState.update("appState", {
            track: id,
          });
          if (options.playOnLoad) {
            play();
          }
        },
        seekBy: TrackPlayer.seekBy,
        seekTo: TrackPlayer.seekTo,
        stop: TrackPlayer.stop,
        play,
        pause: TrackPlayer.pause,
        playbackRate,
        setPlaybackSpeed: (speed: number) => {
          appState.update("appState", {
            playbackRate: speed,
          });
          return Promise.resolve();
        },
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
