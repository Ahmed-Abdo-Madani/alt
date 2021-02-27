import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";

const AppButton = ({
  title,
  shadow = true,
  style,
  onPress,
  bgColor = colors.blueLight,
  textColor = colors.white,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.conatainer,
        { backgroundColor: bgColor },
        shadow && styles.shadow,
        style,
      ]}
      onPress={onPress}
    >
      <AppText style={[styles.text, { color: textColor }]}>{title} </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  conatainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 10,
  },
  shadow: {
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.2,
    shadowColor: "black",
  },

  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
