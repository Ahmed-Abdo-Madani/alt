import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getUserOrders } from "../actions/ordersActions";
import AppText from "../components/AppText";
import colors from "../config/colors";
import cache from "../utility/cache";
import ListItem from "../components/ListItem";

const OrderScreen = () => {
  const [orders, setorders] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (!orders)
    return (
      <View style={styles.noOrder}>
        <AppText style={styles.text}>لا توجد طلبات 😢 </AppText>
      </View>
    );
  return (
    <View style={styles.noOrder}>
      <AppText style={styles.text}>orders 🚚 </AppText>
      {/*  <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={orders}
        keyExtractor={(item, i) => i.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: colors.creamy,
            }}
          />
        )}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => {
              navigation.navigate("itemDetails", {
                data: item,
                id: item.id,
                request: item.requestDetails,
              });
            }}
            id={item.id}
            title={item.name}
            subtitle={item.price + " ﷼"}
          />
        )}
      /> */}
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
