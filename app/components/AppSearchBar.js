import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";

const AppSearchBar = (
  onChangeText,
  placeholder,
  searchValue,
  loading,
  onPress
) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="search"
        size={25}
        color={colors.darkGray}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={searchValue}
      />
      <AppButton
        style={styles.submitButton}
        shadow={false}
        loading={loading}
        onPress={onPress}
        bgColor={colors.blueLight}
        textColor={colors.white}
        title="Search"
      />
    </View>
  );
};

export default AppSearchBar;

const styles = StyleSheet.create({
  submitButton: {},
  input: {},
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.lightGray,
  },
  icon: {},
});
