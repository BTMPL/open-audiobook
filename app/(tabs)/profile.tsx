import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track, tracks } from "@/components/providers/player/PlayerProvider";
import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

export default function Profile() {
  const store = useStore<Track>("books");

  useEffect(() => {
    return () => console.log("unmount");
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {tracks.map((track, it) => (
          <TouchableOpacity key={it}>
            <ThemedText
              onPress={async () => {
                if (store.byId(track.id)) store.remove(track.id);
                else store.add(track);
              }}
            >
              {store.byId(track.id) ? "remove" : "add"} {track.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
