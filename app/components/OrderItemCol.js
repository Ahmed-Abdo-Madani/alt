import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const OrderItemCol = ({data}) => {
  return <View style={styles.container}>
      
      <FlatList
      data={data}
      keyExtractor={}
      
      renderItem={}
      />
  </View>;
};

export default OrderItemCol;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
