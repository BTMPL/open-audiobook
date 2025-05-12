import {
  LocalSource,
  Source,
  SourceType,
} from "@/components/providers/player/PlayerProvider";

export const isLocalSource = (source: object): source is LocalSource => {
  return (
    "current" in source &&
    "cover" in source &&
    typeof source.current === "boolean" &&
    typeof source.cover === "string"
  );
};
