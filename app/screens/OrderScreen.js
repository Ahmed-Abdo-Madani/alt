import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
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
        <AppText style={styles.text}>لا توجد طلبات 😢 </AppText>
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
    backgroundColor: colors.creamy,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.lightGray,
  },
});
