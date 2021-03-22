import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";
import MapScreen from "../screens/MapScreen";

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
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.4],
            extrapolate: "clamp",
          }),
        },
      }),
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
    <Stack.Screen
      name="orders"
      component={OrderScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="map"
      component={MapScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    />
  </Stack.Navigator>
);

export default ProfileStack;
