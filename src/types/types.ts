import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import theme from "../theme";
import {
  TextProps as NativeTextProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ColorType = keyof typeof theme.colors;
export type FontSizeType = keyof typeof theme.fontSizes;
export type FontWeightType = keyof typeof theme.fontWeights;

export interface TextProps extends NativeTextProps {
  color?: ColorType;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  shadow?: boolean;
  style?: NativeTextProps["style"];
}

export const Screen = {
  Statistics: { name: "STATISTICS", icon: "bar-chart" },
  Histórico: { name: "HISTORICO", icon: "food-bank" },
  Produtos: { name: "PRODUTOS", icon: "local-pizza" },
  Settings: { name: "SETTINGS", icon: "settings" },
} as const;

export type ScreenTitle = (typeof Screen)[keyof typeof Screen]["name"];
export type ScreenIcon = (typeof Screen)[keyof typeof Screen]["icon"];

export type BottomTabBarProps = ReactNavigationBottomTabBarProps;

export type TabBarItemProps = {
  title: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
};

export type TabBarMarkerProps = {
  animatedStyle: StyleProp<ViewStyle>;
};

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
