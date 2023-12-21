import { View } from "react-native";
import { OrderAddProps, OrderProps } from "../../../types/stack/OrderStack";
import Header from "../../Header";
import Divider from "../../Divider";
import ContainerStyle from "../../../styles/Containers";
import useLiveOrder from "../../../hooks/useLiveOrder";
import React from "react";
import LoadingComponent from "../../LoadingComponent";
import { ProductWithAmount } from "../../../types/Order";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../../Text";
import { OrderProduct } from "../../../types/OrderProduct";
import { Product } from "../../../types/Product";
import { ProductLine } from "./OrderPage";
import useProductsInOrder from "../../../hooks/useProductsInOrder";

const Products = ({
  navigation,
  id,
  products,
}: {
  navigation: OrderAddProps["navigation"];
  id: string;
  products: ProductWithAmount[];
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

      {products.map((product) => {
        const orderProduct = {
          amount: product.orderProduct[0]?.amount || 0,
          comment: product.orderProduct[0]?.comment || "",
          product: product as Product,
          orderId: Number(id),
          productId: product.id,
        } as OrderProduct;
        return (
          <ProductLine
            product={orderProduct}
            key={product.id}
            deletable={false}
          />
        );
      })}
    </View>
  );
};

export default function ProductsList({ navigation, route }: OrderAddProps) {
  const { id } = route.params;

  const { order, status, error } = useProductsInOrder(id);

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
        goBack={() => navigation.goBack()}
      />

      <Divider />

      {order?.categories?.[0]?.products ? (
        <Products
          navigation={navigation}
          id={id}
          products={order.categories[0].products}
        />
      ) : null}
    </View>
  );
}
