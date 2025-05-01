import { StyleSheet, View } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";
import { ThemedText } from "@/components/ThemedText";

export default function Layout() {
  return (
    <Tabs>
      <View style={{ flex: 1 }}>
        <TabSlot />
      </View>
      <View style={{ marginTop: 10 }}>
        <MiniPlayer />
      </View>
      <TabList style={styles.tabs}>
        <TabTrigger style={styles.tabTrigger} name="home" href="/">
          <ThemedText>Home</ThemedText>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="library" href="/library">
          <ThemedText>Library</ThemedText>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="profile" href="/profile">
          <ThemedText>Profile</ThemedText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    // position: "absolute",
    backgroundColor: "#d3d3d3",
    bottom: 0,
    padding: 10,
    paddingBottom: 32,
  },
  tabTrigger: {
    flex: 1,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
