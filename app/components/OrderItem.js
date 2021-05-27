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
                style={styles.orderBg}
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
      <View
        style={[
          styles.orderStatus,
          delivered
            ? { backgroundColor: colors.green }
            : processing
            ? { backgroundColor: colors.blueLight }
            : paied
            ? { backgroundColor: colors.black }
            : { backgroundColor: colors.red },
        ]}
      >
        {delivered ? (
          <Text style={styles.statusText}>{"يتم توصيل طلبك"}</Text>
        ) : processing ? (
          <Text style={styles.statusText}>{"الطلب تحت التجهيز"}</Text>
        ) : paied ? (
          <Text style={styles.statusText}>{"تم دفع قيمة الطلب"}</Text>
        ) : (
          <Text style={styles.statusText}>{"لم يتم دفع قيمة الطلب"}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  orderBg: {
    backgroundColor: colors.white,
  },
  orderStatus: {
    flex: 1,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  items: {
    flex: 7,
    padding: 5,
    backgroundColor: colors.white,
  },
});
