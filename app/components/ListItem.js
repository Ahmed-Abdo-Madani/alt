import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subtitle, image, iconName }) => {
  return (
    <TouchableOpacity activeOpacity={0.65} style={styles.container}>
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
    backgroundColor: colors.creamyDark,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: colors.darkGray,
    paddingBottom: 5,
    textTransform: "capitalize",
  },
});
