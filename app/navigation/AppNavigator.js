import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HomeNavigator from "./HomeNavigator";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="homeTabs" component={HomeNavigator} />
        <Stack.Screen name="itemDetails" component={ItemDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
