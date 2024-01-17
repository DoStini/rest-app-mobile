import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Product } from "../Product";
import { Category } from "../Category";

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
