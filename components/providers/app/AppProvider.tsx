import { useEffect } from "react";
import { useStore } from "../datbase/DatabaseProvider";

export type AppState = {
  id: "appState";
  track: string | undefined;
  playbackRate: number;
};

export const AppProvider = ({ children }: { children: React.ReactElement }) => {
  const appState = useStore<AppState>("appState");

  useEffect(() => {
    const currentState = appState.byId("appState") || {};
    appState.add({
      id: "appState",
      track: undefined,
      playbackRate: 1,
      ...currentState,
    });
  }, []);
  return children;
};
