import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import useLiveOrder from "../../../hooks/useLiveOrder";
import { OrderAddProps, OrderProps } from "../../../types/stack/OrderStack";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import theme from "../../../theme";
import NumberInput from "../../NumberInput";
import Divider from "../../Divider";
import { OrderProduct } from "../../../types/OrderProduct";
import {
  deleteOrderProduct,
  resetOrderState,
  updateOrderProduct,
} from "../../../store/selectedOrderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import Header from "../../Header";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

export const ProductLine = ({ product }: { product: OrderProduct }) => {
  const [amount, setAmount] = React.useState(product.amount);
  const dispatch = useDispatch<AppDispatch>();

  // If another user updates the amount, we want to update it in the UI
  useEffect(() => {
    setAmount(product.amount);
  }, [product.amount]);

  const onFinishChanges = useCallback(
    (value: number) => {
      console.log("onFinishChanges", value);
      dispatch(
        updateOrderProduct({
          productId: String(product.productId),
          orderId: String(product.orderId),
          amount: value,
        })
      );
    },
    [dispatch, updateOrderProduct, product]
  );

  const onDelete = () => {
    dispatch(
      deleteOrderProduct({
        productId: String(product.productId),
        orderId: String(product.orderId),
      })
    );
  };

  return (
    <View style={ContainerStyle.listItemContainer}>
      <View style={[ContainerStyle.rowSpaceBetween, { alignItems: "center" }]}>
        <Text fontSize="small" fontWeight="light" color="textSecondary">
          {product.product.name}
        </Text>

        <View style={ContainerStyle.row}>
          <NumberInput
            value={amount}
            setValue={setAmount}
            handleDelete={onDelete}
            onFinished={onFinishChanges}
          />

          <Pressable
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Add comment")}
          >
            <MaterialIcons
              name="edit"
              color={theme.colors.textSecondary}
              size={26}
              onPress={() => console.log("Delete product")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const Products = ({
  navigation,
  id,
  products,
}: {
  navigation: OrderProps["navigation"] | OrderAddProps["navigation"];
  id: string;
  products: OrderProduct[];
}) => {
  return (
    <View>
      <View style={[ContainerStyle.rowSpaceBetween, { paddingBottom: 15 }]}>
        <Text fontSize="medium" fontWeight="bold">
          Products
        </Text>
        <MaterialIcons
          name="add-circle-outline"
          size={30}
          onPress={() => navigation.navigate("Order/Add", { id })}
        />
      </View>

      {products.map((product) => (
        <ProductLine product={product} key={product.productId} />
      ))}
    </View>
  );
};

const OrderPage = ({ navigation, route }: OrderProps) => {
  const { id } = route.params;

  const isVisible = navigation.isFocused();

  const { order, status, updating, refresh, error } = useLiveOrder(
    id,
    isVisible
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (String(order?.id) === id) {
      return;
    }

    dispatch(resetOrderState());
  }, [order]);

  if (error) {
    console.error(error);
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
        goBack={() => navigation.navigate("OrderList")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order.creator.name}
        </Text>
      </View>

      <Divider />

      <Products products={order.OrderProduct} navigation={navigation} id={id} />
    </View>
  );
};

export default OrderPage;