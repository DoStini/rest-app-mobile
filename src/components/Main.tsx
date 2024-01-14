import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from "../types/ScreenTypes";
import TabBar from "./tabBar/TabBar";
import HistoryStack from "./history/HistoryStack";
import Settings from "./settings/Settings";
import ProductStack from "./products/ProductsStack";
import LoadingComponent from "./LoadingComponent";

const BottomTab = createBottomTabNavigator();

import useAuth from "../hooks/useAuth";
import Login from "./auth/Login";
import OrdersStack from "./orders/active/OrderStack";
import React from "react";

const Main = () => {
  const { user, loading, error, revalidate } = useAuth();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <Login revalidate={revalidate} />;
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <BottomTab.Screen name={Screen.Orders.name} component={OrdersStack} />
        <BottomTab.Screen name={Screen.History.name} component={HistoryStack} />
        <BottomTab.Screen
          name={Screen.Products.name}
          component={ProductStack}
        />
        <BottomTab.Screen name={Screen.Settings.name} component={Settings} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
