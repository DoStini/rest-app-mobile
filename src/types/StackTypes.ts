import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type OrderStackNavigatorParamList = {
  Orders: undefined;
  OrderHistory: undefined;
};

type OrdersScreenNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Orders"
>;
type OrderHistoryScreenNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "OrderHistory"
>;

export type OrdersProps = {
  navigation: OrdersScreenNavigationProp;
};

export type OrderHistoryProps = {
  navigation: OrderHistoryScreenNavigationProp;
};

type ProductStackNavigatorParamList = {
  Products: undefined;
  Product: { id: string };
};

type ProductsNavigationProp = StackNavigationProp<
  ProductStackNavigatorParamList,
  "Products"
>;
type ProductNavigationProp = StackNavigationProp<
  ProductStackNavigatorParamList,
  "Product"
>;

export type ProductsProps = {
  navigation: ProductsNavigationProp;
};

export type ProductProps = {
  navigation: ProductNavigationProp;
  route: RouteProp<ProductStackNavigatorParamList, "Product">;
};
