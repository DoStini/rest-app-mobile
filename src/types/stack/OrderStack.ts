import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type OrderStackNavigatorParamList = {
  CreateOrder: undefined;
  OrderList: undefined;
  Order: { id: string };
  "Order/Add": { id: string };
  "Order/Print": { id: string };
  "Order/Edit": { id: string };
};

type OrderNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order"
>;

type OrderAddNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order/Add"
>;

type OrderListNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "OrderList"
>;

export type OrderListProps = {
  navigation: OrderNavigationProp;
};

export type CreateOrderProps = {
  navigation: OrderNavigationProp;
};

export type OrderProps = {
  navigation: OrderListNavigationProp;
  route: RouteProp<OrderStackNavigatorParamList, "Order">;
};

// Print order props

type OrderPrintNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order/Print"
>;

export type OrderPrintProps = {
  navigation: OrderPrintNavigationProp;
  route: RouteProp<OrderStackNavigatorParamList, "Order/Print">;
};

// Edit order props

type EditOrderNavigationprops = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order/Edit"
>;

export type EditOrderProps = {
  navigation: EditOrderNavigationprops;
  route: RouteProp<OrderStackNavigatorParamList, "Order/Edit">;
};

export type OrderAddProps = {
  navigation: OrderAddNavigationProp;
  route: RouteProp<OrderStackNavigatorParamList, "Order/Add">;
};
