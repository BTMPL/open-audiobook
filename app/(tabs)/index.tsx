import { useEffect, useState } from "react";
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
} from "react-native";

import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

import ParallaxScrollView from "@/components/ParallaxScrollView";
import Slider from "@react-native-community/slider";

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";

TrackPlayer.setupPlayer();

import style, { slider } from "./style";

var track = {
  id: "1",
  url: "http://127.0.0.1:8080/book.mp3",
  title: "Hyperion",
  cover: "http://127.0.0.1:8080/hyperion.jpg",
  synopsis:
    "The novel begins with the Consul receiving a message from Hegemony CEO Meina Gladstone that he is to return to the planet Hyperion as a member of the Shrike Pilgrimage. It is explained that the Time Tombs on Hyperion appear to be opening and an Ouster fleet is approaching the system, although their intentions are unknown. Gladstone also explains that one of the pilgrims is suspected to be an agent of the Ousters, but they don't know which one. The Consul is to meet up with the Templar tree ship Yggdrasill along with the other pilgrims on his journey to the Outback planet. ",
  duration: 8 * 60 * 60 + 25 * 60 + 19,
  chapters: [
    { from: 0, to: 2 * 60 + 7, title: "Book info" },
    { from: 2 * 60 + 7 + 1, to: 13 * 60 + 9, title: "Prologue" },
    { from: 13 * 60 + 9, to: 48 * 60 + 21, title: "Hyperion 01" },
    {
      from: 48 * 60 + 21 + 1,
      to: 3 * 60 * 60 + 35 * 60 + 35,
      title: "The Priest`s Tale",
    },
    {
      from: 3 * 60 * 60 + 35 * 60 + 35 + 1,
      to: 4 * 60 * 60 + 14 * 60 + 22,
      title: "Hyperion 02",
    },
    {
      from: 4 * 60 * 60 + 14 * 60 + 22 + 1,
      to: 6 * 60 * 60 + 14 * 60 + 33,
      title: "The Soldier`s Tale",
    },
    {
      from: 6 * 60 * 60 + 14 * 60 + 33 + 1,
      to: 6 * 60 * 60 + 19 * 60 + 47,
      title: "Hyperion 03",
    },
    {
      from: 6 * 60 * 60 + 19 * 60 + 47 + 1,
      to: 8 * 60 * 60 + 25 * 60 + 19,
      title: "The Poet`s Tale",
    },
  ],
};

function toHms(secs: number) {
  const seconds = Math.floor(secs % 60);
  const minutes = Math.floor((secs / 60) % 60);
  const hours = Math.floor(secs / 3600);
  let ret = "";
  if (hours) ret += `${hours.toString()}h `;
  if (minutes || hours) ret += `${minutes.toString().padStart(2, "0")}m `;
  ret += `${seconds.toString().padStart(2, "0")}s`;

  if (ret[0] === "0") ret = ret.slice(1);

  return ret.trim();
}

function findChapter(
  chapters: (typeof track)["chapters"],
  currentTime: number
): (typeof track)["chapters"][0] {
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    if (currentTime >= chapter.from && currentTime <= chapter.to) {
      return chapter;
    }
  }

  return chapters[0];
}

export default function HomeScreen() {
  const [chapterModalVisible, setChapterModalVisible] = useState(false);
  useEffect(() => {
    TrackPlayer.add([track]);
    const storedPosition = storage.getNumber(`track.${track.id}.position`);
    if (storedPosition) {
      TrackPlayer.seekTo(storedPosition);
    }
    () => TrackPlayer.stop();
  }, []);

  const progress = useProgress();
  const playerState = usePlaybackState();

  const chapter = findChapter(track.chapters, progress.position);
  const positionInChapter = progress.position - chapter.from;

  const played = toHms(positionInChapter);
  const left = toHms(chapter.to - positionInChapter);

  const percentage = (positionInChapter / (chapter.to - chapter.from)) * 100;

  useEffect(() => {
    storage.set(`track.${track.id}.position`, progress.position);
  }, [progress.position]);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={<Image src={track.cover} style={style.cover} />}
      >
        <Text style={style.title}>{track.title}</Text>
        <ScrollView style={style.synopsisContainer}>
          <Text style={style.synopsis}>{track.synopsis}</Text>
        </ScrollView>

        <Pressable
          onPress={() => {
            setChapterModalVisible(true);
          }}
        >
          <Text style={style.chapter}>{chapter.title}</Text>
        </Pressable>

        <View style={style.navigation}>
          <Pressable
            onPress={() => {
              TrackPlayer.seekBy(-30);
            }}
          >
            <Text style={style.navigationButton}>-30</Text>
          </Pressable>

          {playerState.state === State.Playing ? (
            <Pressable
              onPress={() => {
                TrackPlayer.pause();
              }}
            >
              <Text style={[style.navigationButton, style.playPause]}>⏸︎</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                TrackPlayer.play();
              }}
            >
              <Text style={[style.navigationButton, style.playPause]}>⏵︎</Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              TrackPlayer.seekBy(30);
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
            TrackPlayer.seekTo(
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
              {track.chapters.map((chap) => (
                <Pressable
                  key={chap.title}
                  onPress={async () => {
                    await TrackPlayer.seekTo(chap.from);
                    TrackPlayer.play();
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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
