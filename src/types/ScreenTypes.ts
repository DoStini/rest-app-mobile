export const Screen = {
  Statistics: { name: "STATISTICS", icon: "bar-chart" },
  Histórico: { name: "HISTORICO", icon: "food-bank" },
  Produtos: { name: "PRODUTOS", icon: "local-pizza" },
  Settings: { name: "SETTINGS", icon: "settings" },
} as const;

export type ScreenTitle = (typeof Screen)[keyof typeof Screen]["name"];
export type ScreenIcon = (typeof Screen)[keyof typeof Screen]["icon"];
