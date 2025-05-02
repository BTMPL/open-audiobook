import { Slot, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    return () => console.log("navigate away");
  }, []);
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    />
  );
}
