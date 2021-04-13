import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const CategoryItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={15}
        color={colors.white}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    flexDirection: "row",
    backgroundColor: colors.darkGray,
    borderRadius: 15,
  },
  icon: {
    padding: 5,
  },
  text: {
    padding: 5,
    fontSize: 16,
    color: colors.white,
  },
});
