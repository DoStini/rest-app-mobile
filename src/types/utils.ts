import { ScreenTitle, ScreenIcon } from "./types";

type BottomTabRouteMap = Record<ScreenTitle, string>;
type BottomTabIconMap = Record<ScreenTitle, ScreenIcon>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  STATISTICS: "Statistics",
  HISTORICO: "Histórico",
  PRODUTOS: "Produtos",
  SETTINGS: "Settings",
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  STATISTICS: "bar-chart",
  HISTORICO: "food-bank",
  PRODUTOS: "local-pizza",
  SETTINGS: "settings",
};

export const getTitleForRoute = (
  screen: ScreenTitle,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
) => routesMap[screen] ?? "";

export const getIconForRoute = (
  screen: ScreenTitle,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
) => iconsMap[screen] ?? "question";
