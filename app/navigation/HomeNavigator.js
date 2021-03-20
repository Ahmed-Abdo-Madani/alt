import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tabs = createBottomTabNavigator();
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import HomeScreen from "../screens/HomeScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../config/colors";

export default function AppNavigator() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: colors.creamyDark },
        activeTintColor: colors.darkGray,
        inactiveTintColor: colors.lightGray,
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
        name="homestack"
        component={HomeStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="rss" color={color} size={size} />
          ),
        }}
        name="feed"
        component={FeedScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
        }}
        name="about us"
        component={AboutUsScreen}
      />
    </Tabs.Navigator>
  );
}
