import React from "react";

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";

export const PlayerContext = React.createContext<{
  add: typeof TrackPlayer.add;
  seekBy: (position: number) => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  stop: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
}>({
  add: () => Promise.resolve(),
  seekBy: () => Promise.resolve(),
  seekTo: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  play: () => Promise.resolve(),
  pause: () => Promise.resolve(),
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  React.useMemo(() => {
    TrackPlayer.setupPlayer();
  }, []);
  React.useEffect(() => {}, []);
  return (
    <PlayerContext.Provider
      value={{
        add: TrackPlayer.add,
        seekBy: TrackPlayer.seekBy,
        seekTo: TrackPlayer.seekTo,
        stop: TrackPlayer.stop,
        play: TrackPlayer.play,
        pause: TrackPlayer.pause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return React.useContext(PlayerContext);
};
