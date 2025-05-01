import { useColorScheme } from "@/hooks/useColorScheme";
import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
  invertedColor = false,
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  invertedColor?: boolean;
}) {
  const scheme = useColorScheme();
  let iconColor = color;
  if (!iconColor) {
    iconColor =
      scheme === (invertedColor ? "dark" : "light") ? "#000000" : "#FFFFFF";
  }
  return (
    <SymbolView
      weight={weight}
      tintColor={iconColor}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
