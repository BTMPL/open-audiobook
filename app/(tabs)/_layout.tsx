import { StyleSheet, View } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function Layout() {
  const scheme = useColorScheme();

  const backgroundColor = Colors[scheme || "light"].background;
  const borderColor = Colors[scheme || "light"].borderColor;
  return (
    <Tabs>
      <View style={{ flex: 1 }}>
        <TabSlot />
      </View>
      <View style={{ marginTop: 10 }}>
        <MiniPlayer />
      </View>
      <TabList style={[styles.tabs, { backgroundColor, borderColor }]}>
        <TabTrigger style={styles.tabTrigger} name="home" href="/">
          <IconSymbol name="house" size={24} />
          <ThemedText type="small">Home</ThemedText>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="library" href="/library">
          <IconSymbol name="book" size={24} />
          <ThemedText type="small">Library</ThemedText>
        </TabTrigger>
        <TabTrigger style={styles.tabTrigger} name="profile" href="/profile">
          <IconSymbol name="burn" size={24} />
          <ThemedText type="small">Debug</ThemedText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    bottom: 0,
    padding: 10,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  tabTrigger: {
    flex: 1,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
