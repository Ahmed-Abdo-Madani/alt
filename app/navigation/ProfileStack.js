import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";

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
  </Stack.Navigator>
);

export default ProfileStack;
