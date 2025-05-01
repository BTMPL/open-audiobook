import { useState } from "react";
import { View, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

import { useColors } from "@/constants/Colors";
type Props = {
  items: Array<{ id: string; label: string; icon?: JSX.Element }>;
  active: string;
  onChange: (id: string) => void;
  prefix?: JSX.Element;
  placeholderStyle?: Object;
};
export const Dropdown = ({
  items,
  active,
  onChange,
  prefix,
  placeholderStyle,
}: Props) => {
  const [open, setOpen] = useState(false);
  const colors = useColors();
  return (
    <>
      <View style={placeholderStyle}>
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

              backgroundColor: colors.modal,
              maxHeight: 300,
              padding: 16,
            }}
            contentContainerStyle={{
              gap: 8,
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
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,

                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: colors.background,

                  borderRadius: 8,
                }}
              >
                {item.icon}
                <ThemedText
                  style={{ fontWeight: item.id === active ? "bold" : "normal" }}
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
