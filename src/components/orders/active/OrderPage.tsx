import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import useLiveOrder from "../../../hooks/orders/useLiveOrder";
import { OrderAddProps, OrderProps } from "../../../types/stack/OrderStack";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../theme";
import Divider from "../../Divider";
import { OrderProduct } from "../../../types/OrderProduct";
import { resetOrderState } from "../../../store/selectedOrderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import Header from "../../Header";
import Button from "../../Button";
import { ScrollView } from "react-native-gesture-handler";
import {
  closeOrderById,
  reopenOrderById,
} from "../../../services/orderService";
import useSnackbar from "../../../hooks/useSnackbar";
import { ProductLine } from "./ProductLine";
import useHistory from "../../../hooks/useHistory";
import {
  convertISOToFormattedDate,
  formatPrice,
} from "../../../config/helpers";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const Products = ({
  navigation,
  id,
  products,
  closed,
}: {
  navigation: OrderProps["navigation"] | OrderAddProps["navigation"];
  id: string;
  products: OrderProduct[];
  closed: boolean;
}) => {
  return (
    <View>
      <View style={[ContainerStyle.rowSpaceBetween, { paddingBottom: 15 }]}>
        <Text fontSize="medium" fontWeight="bold">
          Products
        </Text>
        {!closed && (
          <MaterialIcons
            name="add-circle-outline"
            size={30}
            onPress={() => navigation.navigate("Order/Add", { id })}
          />
        )}
      </View>

      {products.map((product) => (
        <ProductLine
          product={product}
          key={product.productId}
          deletable
          orderClosed={closed}
        />
      ))}
    </View>
  );
};

const OrderPage = ({ navigation, route }: OrderProps) => {
  const { id } = route.params;

  const isVisible = navigation.isFocused();
  const { open: openSnackbar } = useSnackbar();
  const { order, status, error } = useLiveOrder(id, isVisible);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { refresh: refreshHistory } = useHistory();

  const onClose = useCallback(() => {
    setLoading(true);
    closeOrderById(id).then(() => {
      refreshHistory();
    });
  }, [id]);

  const onReopen = useCallback(() => {
    setLoading(true);
    reopenOrderById(id).then(() => {
      refreshHistory();
    });
  }, [id]);

  // set loading to false when the order.closed changes
  useEffect(() => {
    setLoading(false);
  }, [order?.closed]);

  useEffect(() => {
    if (String(order?.id) === String(id) || order === null) {
      return;
    }

    dispatch(resetOrderState());
  }, [order]);

  if (error) {
    console.error(error);
    openSnackbar("An error occurred. Please try again later.");
    navigation.navigate("OrderList");
    return null;
  }

  if (status === "idle" || !order) {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title={`${order.Table.name}, ${order.name}`}
        afterTitle={
          // Show edit button only if the order is not closed
          !order?.closed && (
            <Pressable
              style={{ paddingLeft: 10 }}
              onPress={() => {
                navigation.navigate("Order/Edit", { id });
              }}
            >
              <MaterialIcons
                name="edit"
                color={theme.colors.textPrimary}
                size={26}
              />
            </Pressable>
          )
        }
        /* Go back to HistoryOrderList if the order was closed*/
        goBack={() => {
          order.closed
            ? navigation.navigate("HistoryOrderList")
            : navigation.navigate("OrderList");
        }}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order.creator.name}
        </Text>
      </View>

      <Divider />

      {/* Render CreatedAt, ClosedAt and Total price only when the order is closed*/}
      {order.closed && (
        <View>
          <View style={Styles.rowContainer}>
            <Text fontSize="body" fontWeight="bold">
              Created at:
            </Text>
            <Text fontSize="body">
              {convertISOToFormattedDate(order.createdAt)}
            </Text>
          </View>

          <Divider />

          <View style={Styles.rowContainer}>
            <Text fontSize="body" fontWeight="bold">
              Closed at:
            </Text>
            <Text fontSize="body">
              {convertISOToFormattedDate(order.closedAt)}
            </Text>
          </View>

          <Divider />

          <View style={Styles.rowContainer}>
            <Text fontSize="body" fontWeight="bold">
              Total price:
            </Text>
            <Text fontSize="body">{formatPrice(order.closedTotal)}</Text>
          </View>
          <Divider />
        </View>
      )}

      <ScrollView>
        <Products
          products={order.OrderProduct}
          navigation={navigation}
          id={id}
          closed={order.closed}
        />

        {/* Render buttons based on the order state*/}
        {order.closed ? (
          <Button
            text="Reopen order"
            loading={loading}
            onPress={onReopen}
            icon="shopping-cart"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        ) : (
          <View>
            <Button
              text="Send order to kitchen"
              icon="print"
              onPress={() => navigation.navigate("Order/Print", { id })}
              style={{ marginTop: 20, marginBottom: 20 }}
            />

            <Button
              text="Close order"
              loading={loading}
              onPress={onClose}
              icon="shopping-cart"
              style={{ backgroundColor: theme.colors.error, marginBottom: 20 }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderPage;
