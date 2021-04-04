import React from "react";
import { StyleSheet, Image, View } from "react-native";

import Screen from "../components/Screen";

import colors from "../config/colors";
import AppText from "../components/AppText";

const lists = [];

const HomeScreen = () => {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
      </View>
      <View style={styles.body}>
        <AppText style={styles.text}>شركة الطيار للدعاية و الإعلان</AppText>
        <AppText numberOfLines={7} style={styles.text}>
          Somthing About the company , gota be cool , hip , and most important
          trust worthy. and bla bla bla somthing and another clever thing and
          funny also to say 😎 .
        </AppText>
        <AppText numberOfLines={3} style={styles.text}>
          Contact us @ 0544258464 - 0137451355
        </AppText>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueLight,
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 35,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.blueLight,
    width: "100%",
    padding: 50,
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.creamy,
    padding: 15,
  },
  text: {
    color: colors.darkGray,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 200,
  },
});
