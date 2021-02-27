import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

import Card from "../components/Card";
import colors from "../config/colors";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>alt</Text>
      <Text style={[styles.text, { fontSize: 24 }]}>Logo</Text>
      <Card />
      <AppButton
        title="(☞ﾟヮﾟ)☞"
        onPress={() => console.log("Pressed 👌🎉🎉")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 13,
  },
  text: {
    fontSize: 48,
    color: "white",
  },
});
