import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "./OrderList";
import OrderPage from "./OrderPage";
import { OrderStackNavigatorParamList } from "../../../types/stack/OrderStack";
import CreateOrder from "../CreateOrder";
import ProductsList from "./ProductsList";
import PrintOrderPage from "./PrintOrder";
import EditOrder from "../EditOrder";
import HistoryOrderList from "../history/HistoryOrderList";
import NewProduct from "../../products/NewProduct";
import CustomProduct from "./CustomProduct";

const Stack = createStackNavigator<OrderStackNavigatorParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="Order" component={OrderPage} />
      <Stack.Screen name="Order/Edit" component={EditOrder} />
      <Stack.Screen name="HistoryOrderList" component={HistoryOrderList} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="Order/Add" component={ProductsList} />
      <Stack.Screen name="Order/Add/Custom" component={CustomProduct} />
      <Stack.Screen name="Order/Print" component={PrintOrderPage} />
    </Stack.Navigator>
  );
};

export default OrdersStack;
