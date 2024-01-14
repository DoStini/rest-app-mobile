import { StackNavigationProp } from "@react-navigation/stack";

export type StatisticsStackNavigatorParamList = {
  Statistics: undefined;
  "Statistics/Products": undefined;
};

type StatisticsScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics"
>;

export type StatisticsProps = {
  navigation: StatisticsScreenNavigationProp;
};

type StatisticsProductsScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics/Products"
>;

export type StatisticsProductsProps = {
  navigation: StatisticsProductsScreenNavigationProp;
};

// Statistics names from backend to the respective screen names

export const StatisticsStackScreens: Record<
  string,
  keyof StatisticsStackNavigatorParamList
> = {
  "Most Sold Product": "Statistics/Products",
};
