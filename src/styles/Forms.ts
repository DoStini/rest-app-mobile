import { StyleSheet } from "react-native";
import theme from "../theme";

const FormStyles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 12,
    paddingVertical: 10,
    borderBottomColor: theme.colors.backgroundPrimary,
    borderBottomWidth: 1,
  },
  error: {
    color: theme.colors.error,
  },
});

export default FormStyles;
