import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import ListItem from "./ListItem";
import { useDispatch } from "react-redux";
import {
  deleteOrderStatusInDB,
  updateOrderStatusInDB,
} from "../actions/ordersActions";

const OrderItem = ({ data, admin, id }) => {
  const { paied, processing, delivered } = data?.orderStatus;
  const { phoneNumber } = data?.userInfo;

  const dispatch = useDispatch();
  const handeFireStoreOrderStatus = () => {
    let UpdatedOrder = { ...data };
    UpdatedOrder.orderStatus = delivered
      ? { paied: true, processing: true, delivered: true }
      : processing
      ? { paied: true, processing: true, delivered: true }
      : paied
      ? { paied: true, processing: true, delivered: false }
      : { paied: true, processing: false, delivered: false };
    dispatch(updateOrderStatusInDB(phoneNumber, data, UpdatedOrder));
    let fixData = data;
    fixData.orderStatus = { ...UpdatedOrder.orderStatus };
  };
  const handleOrderStatus = () => {
    Alert.alert("للتأكيد", "هل تريد تغير حالة الطلب ؟", [
      {
        text: "Cancel",
        // onPress: () => console.log("canned"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => handeFireStoreOrderStatus(),
      },
    ]);
  };

  const handleOrderCancel = () => {
    Alert.alert("للتأكيد", "هل تريد الغاء الطلب ؟", [
      {
        text: "Cancel",
        // onPress: () => console.log("canned"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => dispatch(deleteOrderStatusInDB(phoneNumber, data)),
      },
    ]);
  };

  const cartItems = data?.cartItems;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!admin}
      onPress={handleOrderStatus}
    >
      <MaterialCommunityIcons
        style={styles.icon}
        name="trash-can"
        size={30}
        onPress={handleOrderCancel}
        color={colors.red}
      />
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
  icon: {
    zIndex: 1,
    position: "absolute",
    top: 15,
    right: 15,
  },
});
