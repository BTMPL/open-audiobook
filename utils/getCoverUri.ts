import {
  LocalSource,
  Track,
} from "@/components/providers/player/PlayerProvider";

const PLACEHOLDER_COVER = "";
export const getCoverUri = (item: Track | undefined): string => {
  if (!item) {
    return PLACEHOLDER_COVER;
  }

  const source = Object.values(item.source).find((source) => source.current);
  if (source && isLocalSource(source) && source.cover) {
    return source.cover;
  }

  return item.cover || PLACEHOLDER_COVER;
};

const isLocalSource = (source: any): source is LocalSource => {
  return (
    typeof source.current === "boolean" && typeof source.cover === "string"
  );
};
