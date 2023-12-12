import { StyleSheet } from "react-native";
import theme from "../theme";

const ContainerStyle = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.selectedColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
  },
  scrollView: {
    marginTop: 20,
    width: "90%",
    height: "90%",
  },
});

export default ContainerStyle;
