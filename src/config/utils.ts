import { ScreenTitle, ScreenIcon } from "../types/ScreenTypes";

type BottomTabRouteMap = Record<ScreenTitle, string>;
type BottomTabIconMap = Record<ScreenTitle, ScreenIcon>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  ORDERS: "Orders",
  HISTORY: "History",
  PRODUCTS: "Products",
  STATISTICS: "Stats",
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  ORDERS: "list",
  HISTORY: "history",
  PRODUCTS: "local-pizza",
  STATISTICS: "bar-chart",
};

export const getTitleForRoute = (
  screen: ScreenTitle,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
) => routesMap[screen] ?? "";

export const getIconForRoute = (
  screen: ScreenTitle,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
) => iconsMap[screen] ?? "error-outline";
