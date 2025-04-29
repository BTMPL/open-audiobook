import {
  View,
  Text,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { tracks } from "@/components/providers/player/PlayerProvider";
import { useRouter } from "expo-router";

export default function Index() {
  const spacing = 12;
  const router = useRouter();
  return (
    <FlatList
      numColumns={2}
      data={tracks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() => {
            router.push(`/details/${item.id}`);
          }}
          style={{
            backgroundColor: "#2d2d2d",
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
              src={item.cover}
              style={{
                aspectRatio: 0.5622,
                resizeMode: "contain",
              }}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center", padding: 8 }}>
            <Text style={{ color: "#ffffff" }}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
