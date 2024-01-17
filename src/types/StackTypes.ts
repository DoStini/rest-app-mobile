import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Product } from "./Product";
import { Category } from "./Category";

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
  Product: { product: Product; categoryName: string | null };
  NewProduct: { categories: Category[] };
};

type ProductsNavigationProp = StackNavigationProp<
  ProductStackNavigatorParamList,
  "Products"
>;
type ProductNavigationProp = StackNavigationProp<
  ProductStackNavigatorParamList,
  "Product"
>;
type NewProductNavigationProp = StackNavigationProp<
  ProductStackNavigatorParamList,
  "NewProduct"
>;

export type ProductsProps = {
  navigation: ProductsNavigationProp;
};

export type ProductProps = {
  navigation: ProductNavigationProp;
  route: RouteProp<ProductStackNavigatorParamList, "Product">;
};

export type NewProductProps = {
  navigation: NewProductNavigationProp;
  route: RouteProp<ProductStackNavigatorParamList, "NewProduct">;
};
