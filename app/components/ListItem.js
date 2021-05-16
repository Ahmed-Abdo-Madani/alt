import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { removeFromCart } from "../actions/cartActions";
import colors from "../config/colors";
import AppText from "./AppText";

const ListItem = ({
  id,
  disabled = false,
  loading = false,
  forOrder = false,
  style,
  title,
  subtitle,
  onPress,
  image,
  iconName,
  profileItem = false,
}) => {
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.65}
        style={styles.itemContainer}
      >
        {image && <Image style={styles.image} uri={image} />}
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

      {!forOrder ? (
        loading ? (
          <ActivityIndicator
            style={styles.deleteButton}
            color={colors.blueLight}
            size={25}
          />
        ) : (
          <MaterialCommunityIcons
            onPress={handleDeleteItem}
            name={profileItem ? "chevron-right" : "trash-can"}
            style={styles.deleteButton}
            size={25}
            color={profileItem ? colors.blueLight : colors.red}
          />
        )
      ) : null}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.creamyDarkTrans,
    width: "100%",
    marginVertical: 5,
    padding: 5,
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginHorizontal: 7,
  },
  icon: {
    marginRight: 20,
  },
  deleteButton: {
    marginRight: 20,
  },
  textContainer: { marginHorizontal: 7 },
  text: {
    color: colors.lightGray,
    paddingBottom: 10,
    fontSize: 18,
    textTransform: "capitalize",
  },
});
