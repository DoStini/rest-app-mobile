export const Screen = {
  Statistics: { name: "STATISTICS", icon: "bar-chart" },
  History: { name: "HISTORY", icon: "food-bank" },
  Products: { name: "PRODUCTS", icon: "local-pizza" },
  Settings: { name: "SETTINGS", icon: "settings" },
} as const;

export type ScreenTitle = (typeof Screen)[keyof typeof Screen]["name"];
export type ScreenIcon = (typeof Screen)[keyof typeof Screen]["icon"];
