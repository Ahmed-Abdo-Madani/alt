import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subtitle, onPress, image, iconName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.65}
      style={styles.container}
    >
      {image && <Image style={styles.image} source={image} />}
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          style={styles.icon}
          size={35}
          color={colors.blueDark}
        />
      )}
      <View style={styles.textContainer}>
        <AppText style={styles.text}>{title}</AppText>
        {subtitle && <AppText>{subtitle}</AppText>}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.creamyDarkTrans,
    width: "100%",
    marginVertical: 5,
    padding: 5,
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 7,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {},
  text: {
    color: colors.lightGray,
    paddingBottom: 10,
    fontSize: 16,
    textTransform: "capitalize",
  },
});
