import { View, Image, StyleSheet, Pressable } from "react-native";
import { findChapter, usePlayer } from "../providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { State } from "react-native-track-player";
import { ThemedText } from "../ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "../ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export const MiniPlayer = () => {
  const player = usePlayer();
  const router = useRouter();
  const scheme = useColorScheme();

  const backgroundColor = Colors[scheme || "light"].background;

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
    <View style={[style.container, { backgroundColor }]}>
      <Pressable onPress={() => player.track && router.push(`/player`)}>
        <View style={style.info}>
          <Image
            src={getCoverUri(player.track)}
            style={{ width: 60, height: 60 }}
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
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Pressable
          onPress={() => {
            player.seekBy(-30);
          }}
          style={{
            position: "relative",
            top: -1,
          }}
        >
          <IconSymbol name="gobackward.30" size={32} weight={"light"} />
        </Pressable>

        {player.state === "playing" ? (
          <Pressable onPress={() => player.pause()}>
            <IconSymbol name="pause.circle" size={32} weight={"light"} />
          </Pressable>
        ) : (
          <Pressable onPress={() => player.play()}>
            <IconSymbol name="play.circle" size={48} weight={"light"} />
          </Pressable>
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
    gap: 8,
  },
});
