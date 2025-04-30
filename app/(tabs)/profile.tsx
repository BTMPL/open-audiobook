import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track, tracks } from "@/components/providers/player/PlayerProvider";
import { Text, ScrollView, TouchableOpacity } from "react-native";

export default function Profile() {
  const store = useStore<Track>("books");

  return (
    <ScrollView>
      {Array.from({ length: 200 }).map((_, it) => (
        <TouchableOpacity key={it}>
          <Text
            onPress={async () => {
              if (store.byId("1")) store.remove("1");
              else store.add({ ...tracks[0] });
            }}
            style={{ color: "#ffffff" }}
          >
            {store.byId("1") ? "remove" : "add"} {it}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
