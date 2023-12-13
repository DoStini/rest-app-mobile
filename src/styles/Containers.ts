import { StyleSheet } from "react-native";
import theme from "../theme";

const ContainerStyle = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingHorizontal: 20,
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
  },
  rowSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default ContainerStyle;
