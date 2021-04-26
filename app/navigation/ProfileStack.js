import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";
import MapScreen from "../screens/MapScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
// import PaymentScreen from "../screens/PaymentScreen";
import AppPaymentScreen from "../screens/AppPaymentScreen";
import DeliveryScreen from "../screens/DeliveryScreen";

const Stack = createStackNavigator();

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
    <Stack.Screen name="track" component={DeliveryScreen} />
    <Stack.Screen name="pay" component={AppPaymentScreen} />

    <Stack.Screen
      name="orders"
      component={OrderScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="map" component={MapScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
