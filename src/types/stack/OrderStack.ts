import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type OrderStackNavigatorParamList = {
  OrderList: undefined;
  Order: { id: string };
};

type OrderNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order"
>;
type OrderListNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "OrderList"
>;

export type OrderListProps = {
  navigation: OrderNavigationProp;
};

export type OrderProps = {
  navigation: OrderListNavigationProp;
  route: RouteProp<OrderStackNavigatorParamList, "Order">;
};
