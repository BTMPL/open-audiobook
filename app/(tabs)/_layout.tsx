import { IconSymbol } from "@/components/ui/IconSymbol";
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
          popToTopOnBlur: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="book" size={24} color={color} />
          ),
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
