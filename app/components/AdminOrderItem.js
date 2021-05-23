import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import OrderItem from "./OrderItem";

export default function AdminOrderItem({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.text}>{data.id}</AppText>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={data.orders}
        keyExtractor={(item, i) => i.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              marginVertical: 10,
              height: 1,
              backgroundColor: colors.creamy,
            }}
          />
        )}
        renderItem={({ item }) => <OrderItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 25,
    // overflow: "hidden",
    backgroundColor: colors.creamyDark,

    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowColor: "black",
  },
  header: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    backgroundColor: colors.lightGray,
    alignItems: "center",
  },
  flatList: {
    width: "100%",
  },
  text: {
    color: colors.white,
  },
});
