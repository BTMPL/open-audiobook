import { Track } from "@/components/providers/player/PlayerProvider";
import { getResourceUri } from "./getResourceUri";

export const getTrackUrl = (track: Track) =>
  getResourceUri(Object.values(track.source).find((s) => s.current)?.url || "");
