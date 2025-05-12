import { Alert, Image, Pressable, TouchableOpacity, View } from "react-native";
import {
  LocalSource,
  Source,
  SourceType,
  Track,
  usePlayer,
} from "./providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { ThemedText } from "./ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "./ui/IconSymbol";
import { useDownload } from "./providers/download/DownloadProvider";
import { useStore } from "./providers/datbase/DatabaseProvider";
import { useState } from "react";
import { useColors } from "@/constants/Colors";
import { Progress } from "./ui/Progress";
import { Dropdown } from "./Dropdown";
import { isLocalSource } from "@/utils/track";

export const Book = ({ book }: { book: Track }) => {
  const player = usePlayer();
  const download = useDownload();
  const store = useStore<Track>("books");
  const [progress, setProgress] = useState(-1);

  const startDownload = () => {
    const url = book.source.remote?.url;
    if (!url) return;
    const prom: Promise<Record<string, string>>[] = [];
    prom.push(
      new Promise((resolve, reject) => {
        if (!book?.id) reject("No track");
        download.start(url, `${book!.id}.mp3`, (percentage, done, uri) => {
          if (done) {
            if (uri) resolve({ url: uri });
            else reject("Resource download failed");
          } else {
            setProgress(percentage === 100 ? -1 : percentage);
          }
        });
      })
    );
    prom.push(
      new Promise((resolve, reject) => {
        if (!book?.id) reject("No track");
        download.start(
          book!.cover,
          `${book!.id}.${book!.cover.split(".").pop()}`,
          (_percentage, done, uri) => {
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
  };
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <View style={{ position: "relative" }}>
        <Image src={getCoverUri(book)} style={{ width: 60, height: 60 }} />
        {!book.source.local && (
          <Download book={book} progress={progress} download={startDownload} />
        )}
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
          <ThemedText type="compact">{book.title}</ThemedText>
          <ThemedText type="compact">{book.authors.join(", ")}</ThemedText>
          <ThemedText type="compact">{toHms(book.duration)}</ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={() => {
              const track = Object.values(book.source).find((s) => s.current);
              if (
                track &&
                !(book.id === player.track?.id && player.state === "playing")
              ) {
                player.set(book, { playOnLoad: true });
              } else {
                player.pause();
              }
            }}
          >
            <IconSymbol
              name={
                player.track?.id === book.id && player.state === "playing"
                  ? "pause.circle"
                  : "play.circle"
              }
              size={28}
              weight="light"
            />
          </Pressable>

          <Dropdown
            render={() => (
              <IconSymbol name="slider.horizontal.3" size={28} weight="light" />
            )}
            items={[
              {
                id: "download",
                label: !book.source.local ? "Download" : "Remove",
              },
            ]}
            active={""}
            onChange={(data) => {
              if (data === "download") {
                const source =
                  book.source.local && isLocalSource(book.source.local)
                    ? book.source.local
                    : undefined;
                if (source) {
                  download.remove(source.url).then(() => {
                    store.update(book.id, {
                      source: Object.entries(book.source).reduce(
                        (acc, [key, value]) => {
                          if (key !== "remote") return acc;
                          acc[key as SourceType] = value;
                          return acc;
                        },
                        {} as Record<SourceType, Source>
                      ),
                    });
                  });

                  if (source.cover) download.remove(source.cover);
                } else {
                  startDownload();
                }
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Download = ({
  book,
  download,
  progress,
}: {
  book: Track;
  download: () => void;
  progress: number;
}) => {
  const store = useStore<Track>("books");
  const colors = useColors();
  const colorsInverted = useColors({ invert: true });

  if (progress > -1) {
    return (
      <View
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          right: 5,
          bottom: 5,
        }}
      >
        <Progress value={progress} size={50} color={colors.text} />
      </View>
    );
  }

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
              onPress: download,
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
          borderStyle: "solid",
          borderRightWidth: 40,
          borderTopWidth: 40,
          borderRightColor: "transparent",
          borderTopColor: colorsInverted.background,
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: [{ rotate: "180deg" }],
        }}
      ></View>

      <IconSymbol
        name="arrow.down"
        color={colorsInverted.icon}
        size={16}
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
        }}
      />
    </Pressable>
  );
};
