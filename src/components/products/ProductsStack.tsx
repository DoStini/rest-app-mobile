import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "./Products";
import Product from "./Product";
import NewProduct from "./NewProduct";

const Stack = createStackNavigator();

const ProductStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="NewProduct" component={NewProduct} />
    </Stack.Navigator>
  );
};

export default ProductStack;
