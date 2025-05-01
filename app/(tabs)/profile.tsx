import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track, tracks } from "@/components/providers/player/PlayerProvider";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, TouchableOpacity } from "react-native";

export default function Profile() {
  const store = useStore<Track>("books");
  const id = "1";

  return (
    <ScrollView>
      {Array.from({ length: 200 }).map((_, it) => (
        <TouchableOpacity key={it}>
          <ThemedText
            onPress={async () => {
              if (store.byId(id)) store.remove(id);
              else store.add({ ...tracks[0], id });
            }}
          >
            {store.byId(id) ? "remove" : "add"} {it}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
