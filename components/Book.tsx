import { Alert, Image, Pressable, useColorScheme, View } from "react-native";
import { Source, SourceType, Track } from "./providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { ThemedText } from "./ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "./ui/IconSymbol";
import { useDownload } from "./providers/download/DownloadProvider";
import { useStore } from "./providers/datbase/DatabaseProvider";
import { useState } from "react";

export const Book = ({ item }: { item: Track }) => {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <View style={{ position: "relative" }}>
        <Image src={getCoverUri(item)} style={{ width: 60, height: 60 }} />
        {!item.source.local && <Download book={item} />}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 4 }}>
          <ThemedText type="compact">{item.title}</ThemedText>
          <ThemedText type="compact">{item.authors.join(", ")}</ThemedText>
          <ThemedText type="compact">{toHms(item.duration)}</ThemedText>
        </View>
        <View>
          <ThemedText>
            <Pressable onPress={() => {}}>
              <IconSymbol name="play.circle" size={28} weight="light" />
            </Pressable>
            <Pressable onPress={() => {}}>
              <IconSymbol name="slider.horizontal.3" size={28} weight="light" />
            </Pressable>
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const Download = ({ book }: { book: Track }) => {
  const [progress, setProgress] = useState(-1);
  const download = useDownload();
  const scheme = useColorScheme();
  const store = useStore<Track>("books");
  const color = scheme === "light" ? "#000000" : "#FFFFFF";
  const invertedColor = scheme === "light" ? "#FFFFFF" : "#000000";
  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          "Confirm download",
          "Are you sure you want to download this book?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
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
                        } else {
                          setProgress(percentage);
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
              },
            },
          ]
        );
      }}
      style={{
        display: "flex",
        width: 40,
        height: 40,
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 4,
      }}
    >
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderRightWidth: 40,
          borderTopWidth: 40,
          borderRightColor: "transparent",
          borderTopColor: color,
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: [{ rotate: "180deg" }],
        }}
      ></View>

      {progress > -1 ? (
        <View
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
        >
          <ThemedText
            type="small"
            style={{
              color: invertedColor,
            }}
          >
            {progress}%
          </ThemedText>
        </View>
      ) : (
        <IconSymbol
          name="arrow.down"
          size={16}
          invertedColor={true}
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
          }}
        />
      )}
    </Pressable>
  );
};
