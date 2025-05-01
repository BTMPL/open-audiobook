import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";

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
          <Text style={{ color: "#ffffff" }}>Home</Text>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="library" href="/library">
          <Text style={{ color: "#ffffff" }}>Library</Text>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="profile" href="/profile">
          <Text style={{ color: "#ffffff" }}>Profile</Text>
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
