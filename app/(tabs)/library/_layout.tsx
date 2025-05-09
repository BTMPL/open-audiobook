import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
      />
      <MiniPlayer />
    </View>
  );
}
