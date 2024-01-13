export const Screen = {
  Orders: { name: "ORDERS", icon: "list" },
  History: { name: "HISTORY", icon: "history" },
  Products: { name: "PRODUCTS", icon: "local-pizza" },
  Statistics: { name: "STATISTICS", icon: "bar-chart" },
} as const;

export type ScreenTitle = (typeof Screen)[keyof typeof Screen]["name"];
export type ScreenIcon = (typeof Screen)[keyof typeof Screen]["icon"];
