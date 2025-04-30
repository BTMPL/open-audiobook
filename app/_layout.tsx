import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PlayerProvider } from "@/components/providers/player/PlayerProvider";
import { useCreateStore } from "tinybase/ui-react";
import { createStore } from "tinybase/store";
import { DatabaseProvider } from "@/components/providers/datbase/DatabaseProvider";
import { DownloadProvider } from "@/components/providers/download/DownloadProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const store = useCreateStore(() => createStore());

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <DatabaseProvider store={store}>
      <DownloadProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <PlayerProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="details" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </PlayerProvider>
        </ThemeProvider>
      </DownloadProvider>
    </DatabaseProvider>
  );
}
