import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "./OrderList";
import OrderPage from "./OrderPage";
import { OrderStackNavigatorParamList } from "../../../types/stack/OrderStack";
import CreateOrder from "../CreateOrder";
import ProductsList from "./ProductsList";

const Stack = createStackNavigator<OrderStackNavigatorParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="Order" component={OrderPage} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="Order/Add" component={ProductsList} />
    </Stack.Navigator>
  );
};

export default OrdersStack;
