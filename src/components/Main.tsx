import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from "../types/types";
import TabBar from "./TabBar";
import Statistics from "./Statistics";
import OrderStack from "./OrderStack";
import Settings from "./Settings";
import ProductStack from "./ProductsStack";

const BottomTab = createBottomTabNavigator();

const Main = () => {
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
