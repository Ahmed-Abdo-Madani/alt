import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppIcon = ({
  style,
  onPress,
  size = 35,
  iconColor = "white",
  backgroundColor = "black",
  name = "ab-testing",
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
