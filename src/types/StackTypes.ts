import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Product } from "./Product";

type HistoryStackNavigatorParamList = {
  HistoryOrderList: undefined;
  HistoryOrder: { id: string };
};

type HistoryListNavigationProp = StackNavigationProp<
  HistoryStackNavigatorParamList,
  "HistoryOrder"
>;
type HistoryListOrderScreenNavigationProp = StackNavigationProp<
  HistoryStackNavigatorParamList,
  "HistoryOrderList"
>;

export type HistoryProps = {
  navigation: HistoryListNavigationProp;
};

export type HistoryOrderProps = {
  navigation: HistoryListOrderScreenNavigationProp;
  route: RouteProp<HistoryStackNavigatorParamList, "HistoryOrder">;
};

type ProductStackNavigatorParamList = {
  Products: undefined;
  Product: { product: Product };
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

type StatisticsStackNavigatorParamList = {
  Statistics: undefined;
};

type StatisticsScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics"
>;

export type StatisticsProps = {
  navigation: StatisticsScreenNavigationProp;
};
