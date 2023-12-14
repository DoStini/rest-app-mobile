import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "./OrderList";
import OrderPage from "./OrderPage";
import { OrderStackNavigatorParamList } from "../../../types/stack/OrderStack";
import CreateOrder from "../CreateOrder";

const Stack = createStackNavigator<OrderStackNavigatorParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="Order" component={OrderPage} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
    </Stack.Navigator>
  );
};

export default OrdersStack;
