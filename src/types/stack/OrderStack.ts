import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type OrderStackNavigatorParamList = {
  CreateOrder: undefined;
  OrderList: undefined;
  HistoryOrderList: undefined;
  Order: { id: string };
  "Order/Add/Custom": { id: string };
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

type OrderAddCustomNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "Order/Add/Custom"
>;

type OrderListNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "OrderList"
>;

type HistoryOrderListNavigationProp = StackNavigationProp<
  OrderStackNavigatorParamList,
  "HistoryOrderList"
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

// History order props

export type HistoryOrderListProps = {
  navigation: HistoryOrderListNavigationProp;
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

export type OrderAddCustomProps = {
  navigation: OrderAddCustomNavigationProp;
  route: RouteProp<OrderStackNavigatorParamList, "Order/Add/Custom">;
};
