import { View, Text, ScrollView } from "react-native";

export default function Profile() {
  return (
    <ScrollView>
      {Array.from({ length: 200 }).map((_, it) => (
        <Text key={it} style={{ color: "#ffffff" }}>
          profile - {it}
        </Text>
      ))}
    </ScrollView>
  );
}
