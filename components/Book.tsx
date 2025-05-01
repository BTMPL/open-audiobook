import { Image, View, Text } from "react-native";
import { Track } from "./providers/player/PlayerProvider";
import { toHms } from "@/utils/time";

export const Book = ({ item }: { item: Track }) => {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Image src={item.cover} style={{ width: 60, height: 60 }} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ color: "#ffffff" }}>{item.title}</Text>
          <Text style={{ color: "#ffffff" }}>{item.authors.join(", ")}</Text>
          <Text style={{ color: "#ffffff" }}>{toHms(item.duration)}</Text>
        </View>
        <View>
          <Text style={{ color: "#ffffff" }}>?</Text>
        </View>
      </View>
    </View>
  );
};
