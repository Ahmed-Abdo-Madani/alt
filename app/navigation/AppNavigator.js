import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { useDispatch } from "react-redux";
import { MFWebView, MFSettings, MFTheme } from "myfatoorah-reactnative";

import HomeNavigator from "./HomeNavigator";
import navigation, { navigationRef } from "./RootNavigation";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
// import SplashScreen from "../screens/animated/StrokeAnimation";

import {
  USER_LOGIN,
  USER_PUSH_TOKEN,
  USER_SHIPPING_ADDRESS,
} from "../constants/userConstants";
import { saveUserPushToken } from "../actions/userActions";
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
      payload: cartItemsFromStorage ? cartItemsFromStorage : [],
    });
  };

  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationResponseReceivedListener(() =>
      navigation.navigate("profileStack", { screen: "orders" })
    );
    getCahce();

    let baseURL = "https://apitest.myfatoorah.com";
    let token =
      "Tfwjij9tbcHVD95LUQfsOtbfcEEkw1hkDGvUbWPs9CscSxZOttanv3olA6U6f84tBCXX93GpEqkaP_wfxEyNawiqZRb3Bmflyt5Iq5wUoMfWgyHwrAe1jcpvJP6xRq3FOeH5y9yXuiDaAILALa0hrgJH5Jom4wukj6msz20F96Dg7qBFoxO6tB62SRCnvBHe3R-cKTlyLxFBd23iU9czobEAnbgNXRy0PmqWNohXWaqjtLZKiYY-Z2ncleraDSG5uHJsC5hJBmeIoVaV4fh5Ks5zVEnumLmUKKQQt8EssDxXOPk4r3r1x8Q7tvpswBaDyvafevRSltSCa9w7eg6zxBcb8sAGWgfH4PDvw7gfusqowCRnjf7OD45iOegk2iYSrSeDGDZMpgtIAzYVpQDXb_xTmg95eTKOrfS9Ovk69O7YU-wuH4cfdbuDPTQEIxlariyyq_T8caf1Qpd_XKuOaasKTcAPEVUPiAzMtkrts1QnIdTy1DYZqJpRKJ8xtAr5GG60IwQh2U_-u7EryEGYxU_CUkZkmTauw2WhZka4M0TiB3abGUJGnhDDOZQW2p0cltVROqZmUz5qGG_LVGleHU3-DgA46TtK8lph_F9PdKre5xqXe6c5IYVTk4e7yXd6irMNx4D4g1LxuD8HL4sYQkegF2xHbbN8sFy4VSLErkb9770-0af9LT29kzkva5fERMV90w";
    let theme = new MFTheme("blue", "gray", "Payment", "Cancel");
    MFSettings.sharedInstance.setTheme(theme);
    MFSettings.sharedInstance.configure(baseURL, token);
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
    const userPushToken_inCahe = await cache.get("userPushToken");

    try {
      if (!userPushToken_inCahe) {
        const permission = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (!permission.granted) return;
        const token = await Notifications.getExpoPushTokenAsync();
        dispatch(saveUserPushToken(token));
      } else {
        dispatch({ type: USER_PUSH_TOKEN, payload: userPushToken_inCahe });
      }
    } catch (error) {
      console.log("Error getting Push Token :" + error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="splash" component={SplashScreen} /> */}
        <Stack.Screen name="homeTabs" component={HomeNavigator} />
        <Stack.Screen name="itemDetails" component={ItemDetailsScreen} />
        <Stack.Screen
          name="MFWebView"
          component={MFWebView}
          options={MFWebView.navigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
