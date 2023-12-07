import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleProp, ViewStyle } from "react-native";

export type BottomTabBarProps = ReactNavigationBottomTabBarProps;

type MaterialIconName =
  | "bar-chart"
  | "food-bank"
  | "local-pizza"
  | "settings"
  | "error-outline";

export type TabBarItemProps = {
  title: string;
  icon: MaterialIconName;
  isSelected: boolean;
  onPress: () => void;
};

export type TabBarMarkerProps = {
  animatedStyle: StyleProp<ViewStyle>;
};
