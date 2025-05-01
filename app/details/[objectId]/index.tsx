import {
  Image,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Appearance,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

import { Track } from "@/components/providers/player/PlayerProvider";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { ThemedText } from "@/components/ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  const router = useRouter();

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
              <IconSymbol name="chevron.down.circle.fill" size={32} />
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
