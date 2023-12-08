import { ScreenTitle, ScreenIcon } from "../types/ScreenTypes";

type BottomTabRouteMap = Record<ScreenTitle, string>;
type BottomTabIconMap = Record<ScreenTitle, ScreenIcon>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  HOME: "Home",
  HISTORY: "History",
  PRODUCTS: "Products",
  SETTINGS: "Settings",
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  HOME: "home",
  HISTORY: "history",
  PRODUCTS: "local-pizza",
  SETTINGS: "settings",
};

export const getTitleForRoute = (
  screen: ScreenTitle,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
) => routesMap[screen] ?? "";

export const getIconForRoute = (
  screen: ScreenTitle,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
) => iconsMap[screen] ?? "error-outline";
