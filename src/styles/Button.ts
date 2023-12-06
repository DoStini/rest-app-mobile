import { StyleSheet } from "react-native";
import theme from "../theme";

const ButtonStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
});

export default ButtonStyle;
