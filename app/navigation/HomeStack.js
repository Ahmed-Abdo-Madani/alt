import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const FeedNavigatior = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "transparent" },
      cardOverlayEnabled: true,
    }}
    mode="modal"
  >
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="itemDetails" component={ItemDetailsScreen} />
    <Stack.Screen name="homeCart" component={CartScreen} />
    <Stack.Screen
      name="category"
      component={CategoryScreen}
      options={({ route }) => ({
        title: route.params,
        headerShown: true,
        headerBackTitle: "الرجوع",
      })}
    />
    <Stack.Screen
      name="search"
      component={SearchScreen}
      options={({ route }) => ({
        title: route.params,
        headerShown: true,
        headerBackTitle: "الرجوع",
      })}
    />
  </Stack.Navigator>
);

export default FeedNavigatior;
