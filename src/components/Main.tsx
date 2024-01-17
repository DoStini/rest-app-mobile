import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from "../types/ScreenTypes";
import TabBar from "./tabBar/TabBar";
import ProductStack from "./products/ProductsStack";
import LoadingComponent from "./LoadingComponent";

const BottomTab = createBottomTabNavigator();

import useAuth from "../hooks/useAuth";
import Login from "./auth/Login";
import OrdersStack from "./orders/active/OrderStack";
import React from "react";
import StatisticsStack from "./statistics/StatisticsStack";

const Main = () => {
  const { user, initializing, error } = useAuth();

  if (initializing) {
    return <LoadingComponent />;
  }

  if (error) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <BottomTab.Screen name={Screen.Orders.name} component={OrdersStack} />
        <BottomTab.Screen
          name={Screen.Products.name}
          component={ProductStack}
        />
        <BottomTab.Screen
          name={Screen.Statistics.name}
          component={StatisticsStack}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
