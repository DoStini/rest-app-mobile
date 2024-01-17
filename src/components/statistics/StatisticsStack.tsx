import { createStackNavigator } from "@react-navigation/stack";
import { StatisticsStackNavigatorParamList } from "../../types/stack/StatisticsStack";
import Statistics from "./Statistics";
import ProductStatistics from "./ProductStatistics";
import EmployeeStatistics from "./EmployeeStatistics";
import WeeklyStatistics from "./WeeklyStatistics";

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
      <Stack.Screen
        name="Statistics/Employees"
        component={EmployeeStatistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics/Weekly"
        component={WeeklyStatistics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StatisticsStack;
