import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../components/AppText";
import cache from "../utility/cache";

const OrderScreen = () => {
  const [orders, setorders] = useState();

  const getOrders = async () => {
    const res = await cache.get("orders");
    setorders(res);
  };
  useEffect(() => {
    getOrders();
  }, []);

  if (!orders)
    return (
      <View style={styles.noOrder}>
        <AppText>You didn`t make an order.</AppText>
      </View>
    );
  return (
    <View>
      <Text>orders</Text>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  noOrder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
