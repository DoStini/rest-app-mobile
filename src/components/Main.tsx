import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from "../types/types";
import TabBar from "./TabBar";
import Statistics from "./Statistics";
import OrderStack from "./OrderStack";
import Settings from "./Settings";
import ProductStack from "./ProductsStack";

const BottomTab = createBottomTabNavigator();

import useAuth from "../hooks/useAuth";
import { ActivityIndicator } from "react-native";
import Login from "./auth/Login";
import { deleteItemAsync } from "expo-secure-store";

const Main = () => {
  const { user, loading, error, revalidate } = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" />;
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
        <BottomTab.Screen
          name={Screen.Statistics.name}
          component={Statistics}
        />
        <BottomTab.Screen name={Screen.Histórico.name} component={OrderStack} />
        <BottomTab.Screen
          name={Screen.Produtos.name}
          component={ProductStack}
        />
        <BottomTab.Screen name={Screen.Settings.name} component={Settings} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
