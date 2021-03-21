import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="orders"
      component={OrderScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="map"
      component={MapScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default ProfileStack;