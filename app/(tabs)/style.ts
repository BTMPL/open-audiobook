import { Appearance, StyleSheet } from "react-native";
const colorScheme = Appearance.getColorScheme();

export default StyleSheet.create({
  cover: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  chapter: {
    color: colorScheme === "dark" ? "#fff" : "#000",
    textAlign: "center",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timerValues: {
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationButton: {
    marginTop: 16,
    color: colorScheme === "dark" ? "#ffffff" : "#000000",
    fontSize: 16,
    borderWidth: 1,
    borderColor: colorScheme === "dark" ? "#ffffff" : "#000000",
    borderRadius: "50%",
    width: 48,
    height: 48,
    textAlign: "center",
    lineHeight: 43,
  },
  playPause: {
    fontSize: 36,
    lineHeight: 50,
    backgroundColor: colorScheme === "dark" ? "#ffffff" : "#000000",
    color: colorScheme === "dark" ? "#000000" : "#ffffff",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  synopsisContainer: {
    height: 100,
  },
  synopsis: {
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
});

export const slider =
  colorScheme === "light"
    ? {
        track: "#00000077",
        past: "#ff0000ff",
      }
    : {
        track: "#ffffff77",
        past: "#ff0000ff",
      };
