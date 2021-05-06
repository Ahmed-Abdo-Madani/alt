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
        <AppText style={styles.logoText}>شركة الطيار للدعاية و الإعلان</AppText>
      </View>
      <View style={styles.body}>
        <AppText numberOfLines={7} style={styles.text}>
          نحن في شركة الطيار للدعاية و الإعلان نقدم تشكيلات متنوعة من الهدايا و
          الحلول المبتكرة ,و في تتطلع مستمر للتجديد و الابتكار ساعين للتميز في
          تقديم الافضل
        </AppText>
        <View style={styles.contactContainer}>
          <AppText numberOfLines={3} style={styles.text}>
            تواصل معنا @
          </AppText>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <AppText selectable numberOfLines={3} style={styles.phoneNumber}>
              0500114480
            </AppText>
            <AppText selectable numberOfLines={3} style={styles.phoneNumber}>
              0137451355
            </AppText>
          </View>
        </View>
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
  contactContainer: {
    marginTop: 30,
    backgroundColor: colors.creamyDark,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.blueLight,
    width: "100%",
    padding: 40,
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.creamy,
    padding: 15,
  },
  logoText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  text: {
    color: colors.darkGray,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 10,
    padding: 5,
  },
  phoneNumber: {
    color: colors.blueDark,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 10,
    padding: 5,
  },
  image: {
    width: 150,
    height: 200,
  },
});
