import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import colors from "../config/colors";
import ListItem from "./ListItem";

const OrderItem = (data) => {
  const { paied, processing, delivered } = data.data[1]?.data;
  const cartItems = data.data[0]?.data.cartItems;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.items}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, i) => i.toString()}
          style={styles.FlatList}
          renderItem={(item) => {
            return (
              <ListItem
                forOrder
                id={item.item.id}
                title={item.item.name}
                subtitle={item.item.price + " ﷼"}
                image={item.item.imageURL}
                // FIXME On press for order items details preview
                /*  onPress={() => {
                  navigation.navigate("itemDetails", {
                    data: item.item,
                    id: item.item.id,
                    request: item.item.requestDetails,
                  });
                }} */
              />
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 1,
                padding: 1,
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.orderStatus}>
        {delivered ? (
          <Text>{"🚕"}</Text>
        ) : processing ? (
          <Text>{"♻"}</Text>
        ) : paied ? (
          <Text>{"💲"}</Text>
        ) : (
          <Text>{"💰"}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.creamy,
    flexDirection: "row",
  },
  orderStatus: {
    flex: 1,
    backgroundColor: colors.red,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    flex: 7,
    padding: 5,
    backgroundColor: colors.creamyDark,
  },
});
