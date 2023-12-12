import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "./OrderList";

const Stack = createStackNavigator();

const OrdersStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="OrderList" component={OrderList} />
      {/* <Stack.Screen name="Order" component={HistoryOrder} /> */}
    </Stack.Navigator>
  );
};

export default OrdersStack;
