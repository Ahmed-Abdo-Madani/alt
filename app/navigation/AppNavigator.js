import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HomeNavigator from "./HomeNavigator";
import navigation, { navigationRef } from "./RootNavigation";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

export default function AppNavigator() {
  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationResponseReceivedListener(() =>
      navigation.navigate("feed")
    );
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } catch (error) {
      console.log("Error getting Push Token :" + error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="homeTabs" component={HomeNavigator} />
        <Stack.Screen name="itemDetails" component={ItemDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
