import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { useDispatch } from "react-redux";

import HomeNavigator from "./HomeNavigator";
import navigation, { navigationRef } from "./RootNavigation";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

import { USER_LOGIN, USER_SHIPPING_ADDRESS } from "../constants/userConstants";
import { INIT_CART_ITEMS } from "../constants/cartConstants";
import cache from "../utility/cache";

export default function AppNavigator() {
  const dispatch = useDispatch();

  const getCahce = async () => {
    const cartItemsFromStorage = await cache.get("cartItems");
    const userInfoFromStorage = await cache.get("user");
    const shippingAddressFromStorage = await cache.get("address");

    dispatch({
      type: USER_LOGIN,
      payload: userInfoFromStorage,
    });

    dispatch({
      type: USER_SHIPPING_ADDRESS,
      payload: shippingAddressFromStorage,
    });
    dispatch({
      type: INIT_CART_ITEMS,
      payload: cartItemsFromStorage,
    });
  };

  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationResponseReceivedListener(() =>
      navigation.navigate("itemDetails")
    );
    getCahce();
  }, []);

  /* const getUserFromCache = async()=>{
    const user = await cache.get('user')
    if (user){
    dispatch({
        type: USER_LOGIN,
        payload: user,
      })
    }
  } */
  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
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
