import {
  LocalSource,
  Source,
} from "@/components/providers/player/PlayerProvider";

export const isLocalSource = (
  source: Source | LocalSource
): source is LocalSource => {
  return (
    "current" in source &&
    "cover" in source &&
    typeof source.current === "boolean" &&
    typeof source.cover === "string"
  );
};
