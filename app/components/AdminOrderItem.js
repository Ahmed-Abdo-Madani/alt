import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import OrderItem from "./OrderItem";

export default function AdminOrderItem(data) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText>User Name 🐱‍👤</AppText>
      </View>
      <OrderItem data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    width: "100%",
  },
});
