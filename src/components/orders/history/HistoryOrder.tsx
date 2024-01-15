import Text from "../../Text";
import { View, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useSelectedOrder from "../../../hooks/orders/useSelectedOrder";
import LoadingComponent from "../../LoadingComponent";
import theme from "../../../theme";
import {
  convertISOToFormattedDate,
  formatPrice,
} from "../../../config/helpers";
import { OrderProduct } from "../../../types/OrderProduct";
import ContainerStyle from "../../../styles/Containers";
import Header from "../../Header";
import Divider from "../../Divider";
import Button from "../../Button";
import { MaterialIcons } from "@expo/vector-icons";
import { reopenOrderById } from "../../../services/orderService";
import { HistoryOrderProps } from "../../../types/stack/OrderStack";
import useHistory from "../../../hooks/useHistory";
import { useState } from "react";

const Styles = StyleSheet.create({
  InfoBox: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  listItemContainer: {
    padding: 20,
    width: "100%",
    backgroundColor: theme.colors.selectedColor,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
  },
});

const HistoryOrder = ({ navigation, route }: HistoryOrderProps) => {
  const { id } = route.params;
  const { selectedOrder, status } = useSelectedOrder(id);
  const { refresh: refreshHistory } = useHistory();
  const [loading, setLoading] = useState(false);

  if (!selectedOrder || status === "loading") {
    return <LoadingComponent />;
  }

  const handleReopenOrder = async (id: number) => {
    setLoading(true);
    await reopenOrderById(id.toString());
    navigation.navigate("OrderList");
    refreshHistory();
    setLoading(false);
  };

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title={`${selectedOrder.name}`}
        afterTitle={
          <Pressable
            style={{ paddingLeft: 10 }}
            onPress={() => {
              console.log("print");
            }}
            disabled={loading}
          >
            <MaterialIcons
              name="print"
              color={theme.colors.textPrimary}
              size={26}
            />
          </Pressable>
        }
        goBack={() => navigation.navigate("HistoryOrderList")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold">
          Creator:
        </Text>
        <Text fontSize="body">{selectedOrder.creator.name}</Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold">
          Created at:
        </Text>
        <Text fontSize="body">
          {convertISOToFormattedDate(selectedOrder.createdAt)}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold">
          Closed at:
        </Text>
        <Text fontSize="body">
          {convertISOToFormattedDate(selectedOrder.closedAt)}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold">
          Total price:
        </Text>
        <Text fontSize="body">{formatPrice(selectedOrder.closedTotal)}</Text>
      </View>

      <Divider />

      <ScrollView>
        <View>
          <Text
            fontSize="medium"
            fontWeight="bold"
            style={{ paddingBottom: 15 }}
          >
            Products
          </Text>

          {selectedOrder.OrderProduct &&
            selectedOrder.OrderProduct.map((product: OrderProduct) => (
              <View
                key={product.productId}
                style={ContainerStyle.rowSpaceBetween}
              >
                <View
                  style={[
                    ContainerStyle.rowSpaceBetween,
                    Styles.listItemContainer,
                  ]}
                >
                  <Text
                    fontSize="small"
                    color="textSecondary"
                    fontWeight="light"
                  >
                    {product.product.name}
                  </Text>
                  <Text
                    fontSize="small"
                    color="textSecondary"
                    fontWeight="light"
                  >
                    {product.amount}
                    {" x "}
                    {formatPrice(product.product.price)}
                    {" = "}
                    {formatPrice(product.closedTotal)}
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <Button
          text="Reopen order"
          icon="shopping-cart"
          onPress={() => handleReopenOrder(selectedOrder.id)}
          style={{ marginTop: 20, marginBottom: 20 }}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

export default HistoryOrder;
