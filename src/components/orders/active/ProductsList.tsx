import { Pressable, StyleSheet, View } from "react-native";
import { OrderAddProps, OrderProps } from "../../../types/stack/OrderStack";
import Header from "../../Header";
import Divider from "../../Divider";
import ContainerStyle from "../../../styles/Containers";
import useLiveOrder from "../../../hooks/orders/useLiveOrder";
import React, { useEffect, useMemo, useState } from "react";
import LoadingComponent from "../../LoadingComponent";
import { CategoryProducts, ProductWithAmount } from "../../../types/Order";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../../Text";
import { OrderProduct } from "../../../types/OrderProduct";
import { Product } from "../../../types/Product";
import { ProductLine } from "./OrderPage";
import useProductsInOrder from "../../../hooks/useProductsInOrder";
import { Category } from "../../../types/Category";
import theme from "../../../theme";
import { ScrollView } from "react-native-gesture-handler";
import useSnackbar from "../../../hooks/useSnackbar";

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
    <ScrollView>
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
    </ScrollView>
  );
};

const SelectCategory = ({
  category,
  setCategory,
  categories,
}: {
  category: number;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  categories: CategoryProducts[];
}) => {
  return (
    <View style={[ContainerStyle.rowSpaceBetween, { marginBottom: 10 }]}>
      {categories.map((cat) => (
        <Pressable
          key={cat.id}
          onPress={() => setCategory(cat.id)}
          style={[
            ContainerStyle.listItemContainer,
            {
              backgroundColor:
                category === cat.id
                  ? theme.colors.backgroundPrimary
                  : theme.colors.tertiary,
              paddingVertical: 15,
            },
          ]}
        >
          <Text
            key={cat.id}
            fontSize="small"
            color="textSecondary"
            fontWeight={category === cat.id ? "bold" : "normal"}
            onPress={() => setCategory(cat.id)}
          >
            {cat.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default function ProductsList({ navigation, route }: OrderAddProps) {
  const { id } = route.params;

  const { order, status, error } = useProductsInOrder(id);

  const [category, setCategory] = useState(0);
  const { open: openSnackbar } = useSnackbar();

  useEffect(() => {
    if (order?.categories) {
      setCategory(order.categories[0].id);
    }
  }, [order?.categories?.length]);

  const selectedCategory = useMemo(() => {
    if (!order?.categories) return null;
    return order.categories.find((cat) => cat.id === category);
  }, [category, order]);

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
        goBack={() => navigation.goBack()}
      />

      <Divider />

      {order.categories ? (
        <SelectCategory
          category={category}
          setCategory={setCategory}
          categories={order.categories}
        />
      ) : (
        <LoadingComponent />
      )}

      {selectedCategory?.products && (
        <Products
          navigation={navigation}
          id={id}
          products={selectedCategory.products}
        />
      )}
    </View>
  );
}
