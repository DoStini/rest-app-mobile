import { StackNavigationProp } from "@react-navigation/stack";

export type StatisticsStackNavigatorParamList = {
  Statistics: undefined;
  "Statistics/Products": undefined;
  "Statistics/Employees": undefined;
  "Statistics/Weekly": undefined;
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

type StatisticsEmployeesScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics/Employees"
>;

export type StatisticsEmployeesProps = {
  navigation: StatisticsEmployeesScreenNavigationProp;
};

type StatisticsWeeklyScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics/Weekly"
>;

export type StatisticsWeeklyProps = {
  navigation: StatisticsWeeklyScreenNavigationProp;
};

// Statistics names from backend to the respective screen names

export const StatisticsStackScreens: Record<
  string,
  keyof StatisticsStackNavigatorParamList
> = {
  "Most Sold Product": "Statistics/Products",
  "Best Employee": "Statistics/Employees",
  "Biggest Order": "Statistics/Employees",
  "Best day of the Week": "Statistics/Weekly",
};
