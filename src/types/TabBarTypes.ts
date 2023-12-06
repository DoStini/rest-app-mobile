import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleProp, ViewStyle } from "react-native";

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
