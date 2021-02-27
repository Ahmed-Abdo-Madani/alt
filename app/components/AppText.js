import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";

const AppText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.blueLight,
  },
});
