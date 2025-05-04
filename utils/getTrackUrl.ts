import { Track } from "@/components/providers/player/PlayerProvider";

export const getTrackUrl = (track: Track) =>
  Object.values(track.source).find((s) => s.current)?.url;
