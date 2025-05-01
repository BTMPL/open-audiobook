import { Pressable, ScrollView } from "react-native";
import { ThemedText } from "./ThemedText";
import { useColors } from "@/constants/Colors";

type Props = {
  items: Array<{ id: string; label: string }>;
  active: string;
  onChange: (id: string) => void;
};

export const Tabs = ({ items, active, onChange }: Props) => {
  const colors = useColors();
  return (
    <ScrollView
      style={{
        paddingTop: 16,
        paddingBottom: 16,
      }}
      contentContainerStyle={{
        gap: 16,
      }}
      horizontal={true}
    >
      {items.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onChange(item.id)}
          style={{
            borderWidth: 2,
            borderRadius: 8,
            borderColor:
              active === item.id ? colors.accent : colors.borderColor,
            padding: 8,
          }}
        >
          <ThemedText>{item.label}</ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
};
