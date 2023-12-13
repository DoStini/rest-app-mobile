import { Pressable, StyleSheet, View } from "react-native";
import useLiveOrder from "../../../hooks/useLiveOrder";
import { OrderProps } from "../../../types/stack/OrderStack";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import theme from "../../../theme";
import NumberInput from "../../NumberInput";
import Divider from "../../Divider";
import { OrderProduct } from "../../../types/OrderProduct";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const ProductLine = ({ product }: { product: OrderProduct }) => {
  const [amount, setAmount] = React.useState(product.amount);
  return (
    <View style={ContainerStyle.listItemContainer}>
      <View style={[ContainerStyle.rowSpaceBetween, { alignItems: "center" }]}>
        <Text fontSize="small" fontWeight="light" color="textSecondary">
          {product.product.name}
        </Text>

        <View style={ContainerStyle.row}>
          <NumberInput value={amount} setValue={setAmount} />

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

const Products = ({ products }: { products: OrderProduct[] }) => {
  return (
    <View>
      <View style={[ContainerStyle.rowSpaceBetween, { paddingBottom: 15 }]}>
        <Text fontSize="medium" fontWeight="bold">
          Products
        </Text>
        <MaterialIcons
          name="add-circle-outline"
          size={30}
          onPress={() => console.log("Add product")}
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
  const { order, status, error } = useLiveOrder(id);

  if (status === "idle") {
    return <LoadingComponent />;
  }

  if (!order) {
    navigation.navigate("OrderList");
    return null;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <View style={ContainerStyle.rowSpaceBetween}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.navigate("OrderList")}
        />
        <Text fontSize="heading" fontWeight="medium">
          {order.Table.name}
          {", "}
          {order.name}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order.creator.name}
        </Text>

        <Divider />

        <Products products={order.OrderProduct} />
      </View>
    </View>
  );
};

export default OrderPage;
