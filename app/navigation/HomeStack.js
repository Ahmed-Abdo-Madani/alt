import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigatior = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="itemDetails"
      component={ItemDetailsScreen}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default FeedNavigatior;
