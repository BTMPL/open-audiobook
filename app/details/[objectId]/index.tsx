import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Modal,
  Appearance,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import Slider from "@react-native-community/slider";

import { State } from "react-native-track-player";

import {
  Chapter,
  findChapter,
  Source,
  SourceType,
  Track,
  usePlayer,
} from "@/components/providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { useRouter } from "expo-router";
import { useDownload } from "@/components/providers/download/DownloadProvider";
import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const player = usePlayer();
  const router = useRouter();
  const download = useDownload();
  const store = useStore<Track>("books");

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
              <ThemedText>??</ThemedText>
            </Pressable>
          </View>
        }
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={<Image src={player.track?.cover} style={style.cover} />}
      >
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {player.track?.title}
        </ThemedText>
        <ScrollView style={style.synopsisContainer}>
          <ThemedText>{player.track?.synopsis}</ThemedText>
        </ScrollView>

        <Pressable
          onPress={() => {
            if (!player.track) return;
            const url = player.track.source.remote?.url;
            if (!url) return;
            download.start(url, `${player.track.id}.mp3`, (percentage, uri) => {
              console.log("Download percentage: ", percentage, uri);
              if (uri && player.track?.id) {
                store.update(player.track.id, {
                  source: Object.entries(player.track.source).reduce(
                    (acc, [key, value]) => {
                      if (key === "local") return acc;
                      acc[key as SourceType] = {
                        ...value,
                        current: false,
                      };
                      return acc;
                    },
                    {
                      local: {
                        url: uri,
                        current: true,
                      },
                    } as Record<SourceType, Source>
                  ),
                });
              }
            });
          }}
        >
          <ThemedText>Download</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => {
            setChapterModalVisible(true);
          }}
        >
          <ThemedText style={{ textAlign: "center" }}>
            {chapter ? chapter.title : undefined}
          </ThemedText>
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
          <ThemedText>{played}</ThemedText>
          <ThemedText>{left}</ThemedText>
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
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
        track: "#ffffff77",
        past: "#ff0000ff",
      };
