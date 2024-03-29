import Text from "../../Text";
import useHistory from "../../../hooks/useHistory";
import theme from "../../../theme";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Order } from "../../../types/Order";
import {
  convertISOToFormattedDate,
  formatPrice,
} from "../../../config/helpers";
import ContainerStyle from "../../../styles/Containers";
import Header from "../../Header";
import { HistoryOrderListProps } from "../../../types/stack/OrderStack";

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

const HistoryOrderList = ({ navigation }: HistoryOrderListProps) => {
  const { items, status, error, refresh: refreshHistory } = useHistory();

  return (
    <View style={[ContainerStyle.contentContainer, { paddingTop: 60 }]}>
      <Header title="History" goBack={() => navigation.navigate("OrderList")} />
      <ScrollView
        style={{ marginTop: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refreshHistory}
          />
        }
      >
        {items?.map((order: Order) => (
          <View style={styles.ListItemContainer} key={order.id}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate("Order", {
                  id: String(order.id),
                })
              }
            >
              <View style={styles.ItemTitle}>
                <Text
                  fontSize="medium"
                  color="textSecondary"
                  fontWeight="semibold"
                >
                  {order.Table.name}
                  {" -"} {order.name}
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
