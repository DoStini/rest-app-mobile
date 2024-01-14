import { StackNavigationProp } from "@react-navigation/stack";

export type StatisticsStackNavigatorParamList = {
  Statistics: undefined;
};
type StatisticsScreenNavigationProp = StackNavigationProp<
  StatisticsStackNavigatorParamList,
  "Statistics"
>;

export type StatisticsProps = {
  navigation: StatisticsScreenNavigationProp;
};
