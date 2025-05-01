import { View, Image, StyleSheet, Pressable } from "react-native";
import { findChapter, usePlayer } from "../providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { State } from "react-native-track-player";
import { ThemedText } from "../ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";

export const MiniPlayer = () => {
  const player = usePlayer();
  const router = useRouter();

  const position = player.progress.position || player.track?.progress || 0;

  const chapter = player.track
    ? findChapter(player.track.chapters, position)
    : undefined;

  useEffect(() => {
    if (!player.track) return;

    const storedPosition = player.track.progress;

    if (storedPosition && player.state !== State.Playing) {
      player.seekTo(storedPosition);
    }

    return () => {};
  }, [player.track]);

  if (!player.track) return null;

  return (
    <View style={style.container}>
      <Pressable onPress={() => player.track && router.push(`/player`)}>
        <View style={style.info}>
          <Image
            src={getCoverUri(player.track)}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <ThemedText type="defaultSemiBold">
              {player.track?.title}
            </ThemedText>
            <ThemedText type="compact">
              {chapter && chapter.title} - ({toHms(position, true)}/
              {toHms(player.track?.duration, true)})
            </ThemedText>
          </View>
        </View>
      </Pressable>
      <View>
        {player.state === "playing" ? (
          <ThemedText onPress={() => player.pause()}>Pause</ThemedText>
        ) : (
          <ThemedText onPress={() => player.play()}>Play</ThemedText>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingRight: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
