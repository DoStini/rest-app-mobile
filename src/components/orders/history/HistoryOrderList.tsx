import Text from "../../Text";
import useHistory from "../../../hooks/useHistory";
import LoadingComponent from "../../LoadingComponent";
import theme from "../../../theme";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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

type GroupedOrders = {
  [key: string]: Order[];
};

const HistoryOrderList = ({ navigation }: HistoryOrderListProps) => {
  const { items, status, error } = useHistory();

  const groupOrdersByTable = (orders: Order[]) => {
    const grouped: GroupedOrders = {};

    orders.forEach((order) => {
      const tableName = order.Table.name;
      if (!grouped[tableName]) {
        grouped[tableName] = [];
      }
      grouped[tableName].push(order);
    });

    return grouped;
  };

  if (status === "loading" || !items) {
    return <LoadingComponent />;
  }

  const groupedItems = groupOrdersByTable(items);

  return (
    <View style={[ContainerStyle.contentContainer, { paddingTop: 60 }]}>
      <Header title="History" goBack={() => navigation.navigate("OrderList")} />
      <ScrollView style={{ marginTop: 20 }}>
        {Object.keys(groupedItems).map((tableName) => (
          <View key={tableName}>
            <Text fontSize="heading" fontWeight="bold">
              {tableName}
            </Text>
            {groupedItems[tableName].map((order: Order) => (
              <View style={styles.ListItemContainer} key={order.id}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate("HistoryOrder", {
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
                      {order.name}
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
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryOrderList;