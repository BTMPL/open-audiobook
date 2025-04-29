import { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  Button,
  View,
  Pressable,
  ScrollView,
  Modal,
  Touchable,
  Appearance,
} from "react-native";

import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

import ParallaxScrollView from "@/components/ParallaxScrollView";
import Slider from "@react-native-community/slider";

import { State } from "react-native-track-player";

import {
  Chapter,
  findChapter,
  usePlayer,
} from "@/components/providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const player = usePlayer();
  const router = useRouter();

  const [chapterModalVisible, setChapterModalVisible] = useState(false);

  const chapter = player.track
    ? findChapter(player.track.chapters, player.progress.position)
    : undefined;
  const positionInChapter = chapter
    ? player.progress.position - chapter.from
    : 0;

  const played = toHms(positionInChapter);
  const left = chapter ? toHms(chapter.to - positionInChapter) : 0;

  const percentage = chapter
    ? (positionInChapter / (chapter.to - chapter.from)) * 100
    : 0;

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
              <Text>??</Text>
            </Pressable>
          </View>
        }
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={<Image src={player.track?.cover} style={style.cover} />}
      >
        <Text style={style.title}>{player.track?.title}</Text>
        <ScrollView style={style.synopsisContainer}>
          <Text style={style.synopsis}>{player.track?.synopsis}</Text>
        </ScrollView>

        <Pressable
          onPress={() => {
            setChapterModalVisible(true);
          }}
        >
          <Text style={style.chapter}>
            {chapter ? chapter.title : undefined}
          </Text>
        </Pressable>

        <View style={style.navigation}>
          <Pressable
            onPress={() => {
              player.seekBy(-30);
            }}
          >
            <Text style={style.navigationButton}>-30</Text>
          </Pressable>

          {player.state === State.Playing ? (
            <Pressable
              onPress={() => {
                player.pause();
              }}
            >
              <Text style={[style.navigationButton, style.playPause]}>⏸︎</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                player.play();
              }}
            >
              <Text style={[style.navigationButton, style.playPause]}>⏵︎</Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              player.seekBy(30);
            }}
          >
            <Text style={style.navigationButton}>+30</Text>
          </Pressable>
        </View>
        <Slider
          style={{}}
          value={percentage}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={slider.past}
          maximumTrackTintColor={slider.track}
          tapToSeek={true}
          onSlidingComplete={(value) => {
            chapter &&
              player.seekTo(
                chapter.from + (value / 100) * (chapter.to - chapter.from)
              );
          }}
        />
        <View style={style.timer}>
          <Text style={style.timerValues}>{played}</Text>

          <Text style={style.timerValues}>{left}</Text>
        </View>
      </ParallaxScrollView>

      <Modal
        visible={chapterModalVisible}
        transparent={true}
        animationType="slide"
        onDismiss={() => {
          setChapterModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) {
              setChapterModalVisible(false);
            }
          }}
        >
          <ScrollView
            style={{
              width: "100%",
              padding: 16,
              backgroundColor: "#000000",
              maxHeight: 300,
            }}
          >
            <View style={{ gap: 8 }}>
              {player.track?.chapters.map((chap: Chapter) => (
                <Pressable
                  key={chap.title}
                  onPress={async () => {
                    await player.seekTo(chap.from);
                    player.play();
                    setChapterModalVisible(false);
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      padding: 16,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontWeight: chapter === chap ? "bold" : "normal",
                      }}
                    >
                      {chap.title}
                    </Text>

                    <Text style={{ color: "#ffffff" }}>
                      {toHms(chap.to - chap.from)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
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
  chapter: {
    color: colorScheme === "dark" ? "#fff" : "#000",
    textAlign: "center",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timerValues: {
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationButton: {
    marginTop: 16,
    color: colorScheme === "dark" ? "#ffffff" : "#000000",
    fontSize: 16,
    borderWidth: 1,
    borderColor: colorScheme === "dark" ? "#ffffff" : "#000000",
    borderRadius: "50%",
    width: 48,
    height: 48,
    textAlign: "center",
    lineHeight: 43,
  },
  playPause: {
    fontSize: 36,
    lineHeight: 50,
    backgroundColor: colorScheme === "dark" ? "#ffffff" : "#000000",
    color: colorScheme === "dark" ? "#000000" : "#ffffff",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  synopsisContainer: {
    height: 100,
  },
  synopsis: {
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
});

const slider =
  colorScheme === "light"
    ? {
        track: "#00000077",
        past: "#ff0000ff",
      }
    : {
        track: "#ffffff77",
        past: "#ff0000ff",
      };
