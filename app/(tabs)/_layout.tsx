import { StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useColors } from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function Layout() {
  const colors = useColors();

  return (
    <Tabs screenOptions={{ animation: "shift", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: { color: colors.text },
          tabBarIcon: () => <IconSymbol name="house" size={24} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarLabelStyle: { color: colors.text },
          tabBarIcon: () => <IconSymbol name="book" size={24} />,
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
          tabBarLabelStyle: { color: colors.text },
          tabBarIcon: () => <IconSymbol name="burn" size={24} />,
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
