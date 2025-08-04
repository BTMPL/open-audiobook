import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track } from "@/components/providers/player/PlayerProvider";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";

export default function Profile() {
  const store = useStore<Track>("books");

  useEffect(() => {
    return () => console.log("unmount");
  }, []);

  const [url, setUrl] = useState("");

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="URL"
            style={{
              flex: 1,
            }}
            onChangeText={(text) => setUrl(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log("Attempting to load from " + url);
              (async () => {
                try {
                  const json = await fetch(url);
                  const data = await json.json();
                  store.add(data);
                  console.log("Data added to store:", data);
                } catch {
                  console.error("Failed to fetch or parse JSON from URL");
                }
              })();
            }}
          >
            <ThemedText>Import</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
