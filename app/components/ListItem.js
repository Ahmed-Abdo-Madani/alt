import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subtitle, image, iconName }) => {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.container}>
      <Image style={styles.image} source={image} />
      <MaterialCommunityIcons
        name={iconName}
        size={35}
        color={colors.blueDark}
      />
      <View style={styles.textContainer}>
        <AppText style={styles.text}>{title}</AppText>
        <AppText>{subtitle}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    paddingBottom: 15,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textContainer: {
    padding: 10,
  },
  text: {
    color: colors.darkGray,
    paddingBottom: 5,
    textTransform: "capitalize",
  },
});
