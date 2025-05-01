import { Image, View } from "react-native";
import { Track } from "./providers/player/PlayerProvider";
import { toHms } from "@/utils/time";
import { ThemedText } from "./ThemedText";

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
          <ThemedText type="compact">{item.title}</ThemedText>
          <ThemedText type="compact">{item.authors.join(", ")}</ThemedText>
          <ThemedText type="compact">{toHms(item.duration)}</ThemedText>
        </View>
        <View>
          <ThemedText>?</ThemedText>
        </View>
      </View>
    </View>
  );
};
