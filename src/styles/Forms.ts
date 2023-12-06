import { StyleSheet } from "react-native";
import theme from "../theme";

const FormStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomColor: theme.colors.backgroundPrimary,
    borderBottomWidth: 1,
  },
});

export default FormStyles;
