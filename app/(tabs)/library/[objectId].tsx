import { Image, StyleSheet, View, Pressable, ScrollView } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

import { Track, usePlayer } from "@/components/providers/player/PlayerProvider";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { ThemedText } from "@/components/ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Button } from "@/components/ui/Button";

export default function Details() {
  const router = useRouter();

  const store = useStore<Track>("books");
  const params = useLocalSearchParams();
  const location = useNavigation();

  const player = usePlayer();

  const book = store.byId(params.objectId as string);

  if (!book) {
    router.push("/");
    return null;
  }

  return (
    <>
      <ParallaxScrollView
        headerComponent={
          <View>
            <Pressable
              onPress={() => {
                if (router.canDismiss()) {
                  router.dismissAll();
                } else {
                  router.back();
                }
              }}
            >
              <IconSymbol
                name={
                  location.getParent()?.getId()
                    ? "chevron.down.circle.fill"
                    : "chevron.left.circle.fill"
                }
                size={32}
              />
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
        <Button
          onPress={() => {
            const track = Object.values(book.source).find((s) => s.current);
            if (
              track &&
              !(book.id === player.track?.id && player.state === "playing")
            ) {
              player.set(book, { playOnLoad: true });
            }
          }}
          label="Play"
        >
          <IconSymbol name="play.circle" size={16} weight="light" />
        </Button>
      </ParallaxScrollView>
    </>
  );
}

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
