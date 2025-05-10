import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Tabs } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

export default function Layout() {
  const tabBarHeight = 83;
  return (
    <>
      {/*
        This is a workaround to make the mini player appear above the tab bar and not be affected
        by the tab navigator transition animation.
      */}
      <View
        style={{
          position: "absolute",
          bottom: tabBarHeight,
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <MiniPlayer />
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "shift",
          tabBarStyle: {
            height: tabBarHeight,
          },
        }}
      >
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
        <Tabs.Screen name="[objectId]" options={{ href: null }} />
      </Tabs>
    </>
  );
}
