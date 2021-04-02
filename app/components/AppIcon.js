import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const AppIcon = ({
  style,
  onPress,
  disabled,
  size = 35,
  iconColor = colors.blueLight,
  backgroundColor = colors.creamy,
  name = "progress-wrench",
}) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        <MaterialCommunityIcons
          name={name}
          size={size / 1.5}
          color={iconColor}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppIcon;
