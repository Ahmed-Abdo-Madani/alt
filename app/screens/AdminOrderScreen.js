import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getUserOrders, getAdminOrders } from "../actions/ordersActions";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AdminOrderItem from "../components/AdminOrderItem";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const { adminOrders, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getAdminOrders());
  }, []);

  if (loading)
    return (
      <View style={styles.noOrder}>
        <ActivityIndicator size="large" color={colors.blueLight} />
      </View>
    );
  if (adminOrders?.length === 0)
    return (
      <View style={styles.noOrder}>
        <AppText style={styles.text}>لا توجد طلبات 😢 </AppText>
      </View>
    );
  return (
    <View style={styles.noOrder}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={adminOrders}
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
        renderItem={({ item }) => {
          return <AdminOrderItem data={item} />;
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  noOrder: {
    backgroundColor: colors.creamy,
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.lightGray,
  },
  flatList: {
    paddingTop: 15,
    width: "100%",
  },
});
