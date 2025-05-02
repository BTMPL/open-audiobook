import { StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useColors } from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(library)/library"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Debug",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="burn" size={24} color={color} />
          ),
        }}
      />
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
