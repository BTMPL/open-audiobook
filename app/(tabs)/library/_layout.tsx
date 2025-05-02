import { MiniPlayer } from "@/components/miniplayer/MiniPlayer";
import { Slot, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function TabLayout() {
  useEffect(() => {
    return () => console.log("navigate away");
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
      />
      <MiniPlayer />
    </View>
  );
}
