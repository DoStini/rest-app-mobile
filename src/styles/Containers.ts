import { StyleSheet } from "react-native";
import theme from "../theme";

const ContainerStyle = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingHorizontal: 20,
    height: "99%",
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
  rowCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  statisticsCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  statisticChart: {
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  modal: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default ContainerStyle;
