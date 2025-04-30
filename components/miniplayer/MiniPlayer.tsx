import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { findChapter, usePlayer } from "../providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { State } from "react-native-track-player";

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
      <Pressable
        onPress={() =>
          player.track && router.push(`/details/${player.track.id}`)
        }
      >
        <View style={style.info}>
          <Image src={player.track?.cover} style={{ width: 50, height: 50 }} />
          <View>
            <Text style={[style.title, style.text]}>{player.track?.title}</Text>
            <Text style={[style.text]}>
              {chapter && chapter.title} - ({toHms(position, true)}/
              {toHms(player.track?.duration, true)})
            </Text>
          </View>
        </View>
      </Pressable>
      <View>
        {player.state === "playing" ? (
          <Text style={[style.text]} onPress={() => player.pause()}>
            Pause
          </Text>
        ) : (
          <Text style={[style.text]} onPress={() => player.play()}>
            Play
          </Text>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: "#ffffff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
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
