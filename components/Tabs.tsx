import { Pressable, ScrollView } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
  items: Array<{ id: string; label: string }>;
  active: string;
  onChange: (id: string) => void;
};

export const Tabs = ({ items, active, onChange }: Props) => {
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
            borderColor: active === item.id ? "#ff0000" : "#ffffff",
            padding: 8,
          }}
        >
          <ThemedText>{item.label}</ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
};
