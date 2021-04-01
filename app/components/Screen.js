import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import constants from "expo-constants";
import colors from "../config/colors";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamy,
    paddingTop: constants.statusBarHeight,
  },
});
