import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import constants from "expo-constants";

const GoBackButton = ({
  style,
  onPress,
  size = 35,
  iconColor = "white",
  backgroundColor = "black",
  name = "arrow-left-bold",
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={onPress ? onPress : () => navigation.goBack()}
    >
      <View
        style={[
          {
            width: size,
            height: size,
            margin: 10,
            position: "absolute",
            zIndex: 1,
            top: constants.statusBarHeight,
            opacity: 0.5,
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

export default GoBackButton;
