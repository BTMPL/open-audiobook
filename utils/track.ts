import { LocalSource } from "@/components/providers/player/PlayerProvider";

export const isLocalSource = (source: any): source is LocalSource => {
  return (
    typeof source.current === "boolean" && typeof source.cover === "string"
  );
};
