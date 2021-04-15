import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";
import MapScreen from "../screens/MapScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "transparent" },
      cardOverlayEnabled: true,
    }}
    mode="modal"
  >
    <Stack.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="cart" component={CartScreen} />
    <Stack.Screen name="login" component={LoginScreen} />
    <Stack.Screen
      name="orders"
      component={OrderScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="map" component={MapScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
