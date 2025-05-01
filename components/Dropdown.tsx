import { useState } from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
type Props = {
  items: Array<{ id: string; label: string }>;
  active: string;
  onChange: (id: string) => void;
};
export const Dropdown = ({ items, active, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View>
        <Pressable onPress={() => setOpen(true)}>
          <Text style={{ color: "#ffffff" }}>
            {items.find((items) => items.id === active)?.label}
          </Text>
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
                }}
              >
                <Text
                  style={{ color: item.id === active ? "#ffffff" : "#000000" }}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
