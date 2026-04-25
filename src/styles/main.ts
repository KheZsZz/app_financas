import { StyleSheet } from "react-native";

export const StylesMain = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
    rowGap: 16,
  },

  content: {
    justifyContent: "center",
    alignContent: "center",
    rowGap: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  link: {
    marginTop: 8,
    color: "#1e90ff",
    fontSize: 16,
  },
});
