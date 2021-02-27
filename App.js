import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SplashScreen from "./app/screens/SplashScreen";
import ItemDetailsScreen from "./app/screens/ItemDetailsScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
