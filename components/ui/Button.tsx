import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { useColors } from "@/constants/Colors";

export const Button = ({
  children,
  label = "",
  onPress,
}: {
  children?: React.ReactNode;
  onPress: () => void;
  label?: string;
}) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.modal,
        padding: 8,
        borderRadius: 24,
      }}
    >
      {children}
      {label && <ThemedText>{label}</ThemedText>}
    </TouchableOpacity>
  );
};
