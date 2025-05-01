import { useState } from "react";
import { View, Modal, Pressable, ScrollView } from "react-native";
import { ThemedText } from "./ThemedText";
type Props = {
  items: Array<{ id: string; label: string; icon?: JSX.Element }>;
  active: string;
  onChange: (id: string) => void;
  prefix?: JSX.Element;
};
export const Dropdown = ({ items, active, onChange, prefix }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View>
        <Pressable
          onPress={() => setOpen(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {prefix || items.find((items) => items.id === active)?.icon}
          <ThemedText>
            {items.find((items) => items.id === active)?.label}
          </ThemedText>
        </Pressable>
      </View>
      <Modal visible={open} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <ScrollView
            style={{
              width: "100%",
              padding: 0,
              backgroundColor: "#000000",
              maxHeight: 300,
            }}
          >
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
                style={{
                  padding: 16,
                  backgroundColor: item.id === active ? "#ff0000" : "#ffffff",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {item.icon}
                <ThemedText
                  style={{ color: item.id === active ? "#ffffff" : "#000000" }}
                >
                  {item.label}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
