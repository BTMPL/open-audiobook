import {
  Image,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Appearance,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

import {
  Source,
  SourceType,
  Track,
} from "@/components/providers/player/PlayerProvider";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useDownload } from "@/components/providers/download/DownloadProvider";
import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { ThemedText } from "@/components/ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";

export default function HomeScreen() {
  const router = useRouter();
  const download = useDownload();
  const store = useStore<Track>("books");
  const params = useLocalSearchParams();

  const book = store.byId(params.objectId as string);

  if (!book) {
    return router.push("/");
  }

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
        headerImage={<Image src={getCoverUri(book)} style={style.cover} />}
      >
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {book.title}
        </ThemedText>
        <ScrollView style={style.synopsisContainer}>
          <ThemedText>{book.synopsis}</ThemedText>
        </ScrollView>

        <Pressable
          onPress={() => {
            if (!book) return;
            const url = book.source.remote?.url;
            if (!url) return;
            const prom: Promise<Record<string, string>>[] = [];
            prom.push(
              new Promise((resolve, reject) => {
                if (!book?.id) reject("No track");
                download.start(
                  url,
                  `${book!.id}.mp3`,
                  (percentage, done, uri) => {
                    if (done) {
                      if (uri) resolve({ url: uri });
                      else reject("Resource download failed");
                    }
                  }
                );
              })
            );
            prom.push(
              new Promise((resolve, reject) => {
                if (!book?.id) reject("No track");
                download.start(
                  book!.cover,
                  `${book!.id}.${book!.cover.split(".").pop()}`,
                  (percentage, done, uri) => {
                    if (done) {
                      if (uri) {
                        resolve({ cover: uri });
                      } else reject("Cover download failed");
                    }
                  }
                );
              })
            );

            Promise.all(prom)
              .then((values) => {
                if (!book?.source) return;
                const partial = values.reduce((acc, value) => {
                  return { ...acc, ...value };
                }, {});

                store.update(book.id, {
                  source: Object.entries(book.source).reduce(
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
                        ...partial,
                        current: true,
                      },
                    } as Record<SourceType, Source>
                  ),
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          <ThemedText>Download</ThemedText>
        </Pressable>
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
