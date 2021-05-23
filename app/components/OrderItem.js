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

const OrderItem = ({ data }) => {
  const { paied, processing, delivered } = data?.orderStatus;
  const cartItems = data?.cartItems;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("EditOrder")}
    >
      <View style={styles.items}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, i) => i.toString()}
          style={styles.FlatList}
          renderItem={({ item }) => {
            return (
              <ListItem
                forOrder
                id={item.id}
                title={item.name}
                subtitle={item.price + " ﷼"}
                image={item.imageURL}
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
          <Text style={styles.statusText}>{"🚕"}</Text>
        ) : processing ? (
          <Text style={styles.statusText}>{"♻"}</Text>
        ) : paied ? (
          <Text style={styles.statusText}>{"💲"}</Text>
        ) : (
          <Text style={styles.statusText}>{"💰"}</Text>
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
  statusText: {
    fontSize: 55,
  },
  items: {
    flex: 7,
    padding: 5,
    backgroundColor: colors.creamyDark,
  },
});
