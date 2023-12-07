import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryOrderList from "./HistoryOrderList";
import HistoryOrder from "./HistoryOrder";
const OrderStack = createStackNavigator();

const HistoryStack: React.FC = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <OrderStack.Screen name="HistoryOrderList" component={HistoryOrderList} />
      <OrderStack.Screen name="HistoryOrder" component={HistoryOrder} />
    </OrderStack.Navigator>
  );
};

export default HistoryStack;
