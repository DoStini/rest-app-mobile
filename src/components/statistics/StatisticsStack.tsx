import { createStackNavigator } from "@react-navigation/stack";
import { StatisticsStackNavigatorParamList } from "../../types/stack/StatisticsStack";
import Statistics from "./Statistics";
import ProductStatistics from "./ProductStatistics";

const Stack = createStackNavigator<StatisticsStackNavigatorParamList>();

const StatisticsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics/Products"
        component={ProductStatistics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StatisticsStack;
