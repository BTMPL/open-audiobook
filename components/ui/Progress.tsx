import { View } from "react-native";

export const Progress = ({
  size,
  value,
  color,
}: {
  size: number;
  value: number;
  color: string;
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      <View
        style={{
          width: size / 2,
          height: size,
          position: "absolute",
          top: 0,
          left: "50%",
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: size / 2,
            height: size,
            overflow: "hidden",
            position: "absolute",
            transformOrigin: "100% 50%",
            transform: [
              { rotate: (value > 50 ? 50 : value) * (360 / 100) + "deg" },
            ],
            top: 0,
            left: (-1 * size) / 2,
          }}
        >
          <View
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              position: "absolute",
              borderRadius: "50%",
              top: 0,
              left: 0,
            }}
          />
        </View>
      </View>
      {/* <View
        style={{
          width: size / 2,
          height: size,
          backgroundColor,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      /> */}
      {value > 50 && (
        <View
          style={{
            width: size / 2,
            height: size,
            overflow: "hidden",
            position: "absolute",
            transformOrigin: "100% 50%",
            transform: [{ rotate: value * (360 / 100) + "deg" }],
            top: 0,
            left: 0,
          }}
        >
          <View
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              position: "absolute",
              borderRadius: "50%",
              top: 0,
              left: 0,
            }}
          />
        </View>
      )}
    </View>
  );
};
