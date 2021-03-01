import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const lists = [];

const HomeScreen = () => {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInitials}>
          <AppText style={styles.text}>👳‍♂️</AppText>
        </View>
      </View>
      <ScrollView style={styles.tabsContainer}>
        <ListItem iconName="clipboard-text-outline" title="orders" />
        <ListItem iconName="hammer-wrench" title="Settings" />
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 35,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.creamyDarkTrans,
    width: "100%",
    padding: 50,
  },
  userInitials: {
    position: "absolute",
    bottom: -25,
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  text: {
    color: colors.white,
    fontSize: 75,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
