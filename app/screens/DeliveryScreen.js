import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

const DeliveryScreen = () => {
  const deliveryHandler = async () => {
    console.log("result");
  };
  return (
    <View style={styles.container}>
      <AppButton onPress={() => deliveryHandler()} title="Track" />
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.creamy,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
