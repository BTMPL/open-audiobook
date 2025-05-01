/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useColorScheme } from "@/hooks/useColorScheme";

const tintColorLight = "rgba(10, 126, 164, 1)";
const tintColorDark = "rgba(255, 255, 255, 1)";

export const Colors = {
  light: {
    text: "rgba(17, 24, 28, 1)",
    background: "rgba(255, 255, 255, 1)",
    modal: "rgb(200, 200, 200)",
    tint: tintColorLight,
    accent: "rgba(247, 129, 25, 1)",
    icon: "#6d6d6d", // needs to be hex for IconSymbol
    tabIconDefault: "rgba(104, 112, 118, 1)'",
    tabIconSelected: tintColorLight,
    borderColor: "rgba(237, 237, 237, 1)",
  },
  dark: {
    text: "rgba(236, 237, 238, 1)",
    background: "rgba(0, 0, 0, 1)",
    modal: "rgb(50, 50, 50)",
    tint: tintColorDark,
    accent: "rgba(247, 129, 25, 1)",
    icon: "#9ba1a6",
    borderColor: "rgb(42, 42, 42)",
    tabIconDefault: "rgba(155, 161, 166, 1)",
    tabIconSelected: tintColorDark,
  },
};

export const useColors = ({ invert = false }: { invert?: boolean } = {}) => {
  const schema = useColorScheme() || "light";
  return Colors[invert ? (schema === "light" ? "dark" : "light") : schema];
};
