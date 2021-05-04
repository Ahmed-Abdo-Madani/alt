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
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 200,
  },
});
