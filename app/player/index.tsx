import {
  Image,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Appearance,
  Text,
  DimensionValue,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import Slider from "@react-native-community/slider";

import { State } from "react-native-track-player";

import {
  findChapter,
  usePlayer,
} from "@/components/providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColors } from "@/constants/Colors";
import { Dropdown } from "@/components/Dropdown";
import { useState } from "react";

const speeds = [
  { id: "0.7", label: "x0.7" },
  { id: "1", label: "x1" },
  { id: "1.2", label: "x1.2" },
  { id: "1.5", label: "x1.5" },
  { id: "1.7", label: "x1.7" },
  { id: "2", label: "x2" },
];

export default function HomeScreen() {
  const player = usePlayer();
  const router = useRouter();
  const color = useColors();

  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);

  const chapter = player.track
    ? findChapter(player.track.chapters, player.progress.position)
    : undefined;
  const positionInChapter = chapter
    ? player.progress.position - chapter.from
    : 0;

  const played = toHms(positionInChapter);
  const left = chapter
    ? toHms(chapter.to - chapter.from - positionInChapter)
    : 0;

  const percentage = chapter
    ? (positionInChapter / (chapter.to - chapter.from)) * 100
    : 0;

  const tooltipOffset =
    tooltipPosition === null ? 0 : Math.max(Math.min(95, tooltipPosition), 5);

  return (
    <>
      <ParallaxScrollView
        headerComponent={
          <View>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <IconSymbol name="chevron.down.circle.fill" size={32} />
            </Pressable>
          </View>
        }
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image src={getCoverUri(player.track)} style={style.cover} />
        }
      >
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {player.track?.title}
        </ThemedText>
        <ScrollView style={style.synopsisContainer}>
          <ThemedText>{player.track?.synopsis}</ThemedText>
        </ScrollView>

        {chapter && player.track?.chapters && (
          <Dropdown
            placeholderStyle={{
              flexDirection: "row",
              justifyContent: "center",
            }}
            items={player.track?.chapters.map((item, index) => {
              return {
                id: index.toString(),
                label: item.title,
              };
            })}
            active={player.track?.chapters.indexOf(chapter).toString()}
            onChange={async (chapIndex) => {
              const chap = player.track?.chapters[parseInt(chapIndex)];
              if (!chap) return;
              await player.seekTo(chap.from);
              player.play();
            }}
            prefix={<IconSymbol name="list.number" size={20} />}
          />
        )}

        <View style={style.navigation}>
          <Pressable
            onPress={() => {
              player.seekTo(chapter?.from ? chapter.from + 1 : 0);
            }}
          >
            <IconSymbol name="backward.end" size={36} weight={"light"} />
          </Pressable>
          <Pressable
            onPress={() => {
              player.seekBy(-30);
            }}
          >
            <IconSymbol name="gobackward.30" size={48} weight={"light"} />
          </Pressable>

          {player.state === State.Playing ? (
            <Pressable
              onPress={() => {
                player.pause();
              }}
            >
              <IconSymbol name="pause.circle" size={64} weight={"light"} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                player.play();
              }}
            >
              <IconSymbol name="play.circle" size={64} weight={"light"} />
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              player.seekBy(30);
            }}
          >
            <IconSymbol name="goforward.30" size={48} weight={"light"} />
          </Pressable>

          <Dropdown
            active={player.playbackRate.toString()}
            items={speeds}
            onChange={(speed) => player.setPlaybackSpeed(parseFloat(speed))}
            render={() => {
              return (
                <View
                  style={{
                    borderColor: color.icon,
                    borderWidth: 2.5,
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    position: "relative",
                    top: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize:
                        player.playbackRate.toString().length === 1 ? 20 : 14,
                      color: color.icon,
                      fontWeight: 500,
                    }}
                  >
                    x{player.playbackRate.toString()}
                  </ThemedText>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            height: 0,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          {tooltipPosition !== null && player.track && chapter && (
            <View
              style={{
                position: "absolute",
                top: -20,
                left: (tooltipOffset + "%") as DimensionValue,
                padding: 4,
                borderRadius: 8,
                backgroundColor: color.icon,
                transform: [{ translateX: "-50%" }],
              }}
            >
              <Text>
                {`${toHms(
                  Math.max(
                    chapter.from - chapter.to,
                    Math.round(
                      ((chapter.to - chapter.from) * tooltipPosition) / 100
                    )
                  ),
                  true
                )} / ${toHms(
                  Math.min(
                    player.track.duration,
                    Math.round(
                      chapter.from +
                        ((chapter.to - chapter.from) * tooltipPosition) / 100
                    )
                  ),
                  true
                )}`}
              </Text>
              <View
                style={{
                  borderWidth: 8,
                  borderColor: "transparent",
                  borderTopColor: color.icon,
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: [{ translateX: -4 }, { rotate: "0deg" }],
                }}
              />
            </View>
          )}
        </View>

        <Slider
          style={{}}
          value={percentage}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={slider.past}
          maximumTrackTintColor={slider.track}
          tapToSeek={true}
          onValueChange={(v) => {
            setTooltipPosition(v);
          }}
          onSlidingComplete={(value) => {
            setTooltipPosition(null);
            chapter &&
              player.seekTo(
                chapter.from + (value / 100) * (chapter.to - chapter.from)
              );
          }}
        />

        <View style={style.timer}>
          <ThemedText>{played}</ThemedText>
          <ThemedText>{left}</ThemedText>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const colorScheme = Appearance.getColorScheme();

const style = StyleSheet.create({
  cover: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  synopsisContainer: {
    height: 100,
  },
});

const slider =
  colorScheme === "light"
    ? {
        track: "#00000077",
        past: "#ff0000ff",
      }
    : {
        track: "#ffffff55",
        past: "#ff0000ff",
      };
