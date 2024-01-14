import Text from "../Text";
import { HistoryProps } from "../../types/StackTypes";
import useHistory from "../../hooks/useHistory";
import LoadingComponent from "../LoadingComponent";
import theme from "../../theme";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Order } from "../../types/Order";
import { convertISOToFormattedDate, formatPrice } from "../../config/helpers";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  ListItemContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.selectedColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
  },
  ItemTitle: {
    marginBottom: 10,
  },
  ItemData: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

const HistoryOrderList: React.FC<HistoryProps> = ({ navigation }) => {
  const { items, status, error } = useHistory();

  const goToHistoryOrder = (orderId: number) => {
    const id = String(orderId);
    navigation.navigate("HistoryOrder", { id });
  };

  if (status === "loading" || status === "idle") {
    return <LoadingComponent />;
  }

  return (
    <View style={[ContainerStyle.contentContainer, { paddingTop: 60 }]}>
      <Header title="History" />
      <ScrollView style={{ marginTop: 20 }}>
        {items?.map((order: Order) => (
          <View style={styles.ListItemContainer} key={order.id}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => goToHistoryOrder(order.id)}
            >
              <View style={styles.ItemTitle}>
                <Text
                  fontSize="medium"
                  color="textSecondary"
                  fontWeight="semibold"
                >
                  Table: {order.Table.name}
                </Text>
              </View>
              <View style={styles.ItemData}>
                <Text fontSize="small" color="textSecondary">
                  Creator:
                </Text>
                <Text fontSize="small" color="textSecondary">
                  {order.creator.name}
                </Text>
              </View>

              <View style={styles.ItemData}>
                <Text fontSize="small" color="textSecondary">
                  Closed at:
                </Text>
                <Text fontSize="small" color="textSecondary">
                  {convertISOToFormattedDate(order.closedAt)}
                </Text>
              </View>

              <View style={styles.ItemData}>
                <Text fontSize="small" color="textSecondary">
                  Total price:
                </Text>
                <Text fontSize="small" color="textSecondary">
                  {formatPrice(order.closedTotal)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryOrderList;
