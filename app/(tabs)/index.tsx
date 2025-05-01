import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { Track } from "@/components/providers/player/PlayerProvider";
import { useRouter } from "expo-router";
import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { getCoverUri } from "@/utils/getCoverUri";

export default function Index() {
  const spacing = 12;
  const router = useRouter();
  const store = useStore<Track>("books");
  const [books, setBooks] = useState<Track[]>(() => {
    return Object.values(store.all());
  });

  useEffect(() => {
    store.all$((data) => {
      setBooks(Object.values(data));
    });
  }, []);

  const scheme = useColorScheme();

  return (
    <FlatList
      numColumns={2}
      data={books}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() => {
            router.push(`/details/${item.id}`);
          }}
          style={{
            backgroundColor: scheme === "light" ? "#e7e7e7" : "#2d2d2d",
            maxWidth: "50%",
            marginLeft: index % 2 ? spacing / 2 : 0,
            marginRight: index % 2 ? 0 : spacing / 2,
            marginBottom: spacing,
            height: 300,

            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              overflow: "hidden",
              height: 250,
            }}
          >
            <Image
              src={getCoverUri(item)}
              style={{
                aspectRatio: 0.5622,
                resizeMode: "contain",
              }}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center", padding: 8 }}>
            <ThemedText>{item.title}</ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
