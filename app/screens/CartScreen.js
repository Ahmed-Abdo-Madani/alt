import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Modal, Text } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { wipeCart } from "../actions/cartActions";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const CartScreen = ({ style }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [noOfItems, setnoOfItems] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [shippingPrice, setshippingPrice] = useState(0);
  const [taxes, settaxes] = useState(0);
  const [loading, setloading] = useState(false);
  const [orderSent, setorderSent] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo, shippingAddresss } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (shippingAddresss === null)
      navigation.navigate("profileStack", { screen: "map" });
  }, []);

  const handleOrderUpload = async () => {
    setloading(true);
    try {
      await firebase
        .firestore()
        .collection("orders")
        .add({ cartItems, shippingAddresss, userInfo })
        .then(() => {
          emptyCart();
        });
    } catch (error) {
      console.log(error);
    }
    if (orderSent) {
      const targetExpoPushToken = "ExponentPushToken[5zMoeBGjA-SrzanQtYRTFW]";
      const message = "new Order: " + userInfo.phoneNumber;
    }
  };

  const emptyCart = () => {
    dispatch(wipeCart());
    setorderSent(true);
    setloading(false);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.closeButton} />
      {orderSent ? (
        <View style={styles.noCartContainer}>
          <MaterialCommunityIcons
            style={[styles.noCartIcon]}
            name="cart-arrow-up"
            size={75}
            color={colors.blueLight}
          />
          <AppText style={styles.noCartText}>Your order is Sent ✅🪁,</AppText>
          <AppText style={styles.noCartText}>
            We will contact you shorlty.
          </AppText>
        </View>
      ) : !cartItems || cartItems?.length === 0 ? (
        <View style={styles.noCartContainer}>
          <MaterialCommunityIcons
            style={[styles.noCartIcon]}
            name="cart-remove"
            size={75}
            color={colors.blueDark}
          />
          <AppText style={styles.noCartText}>Nothing in The Cart</AppText>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={cartItems}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: colors.creamy,
              }}
            />
          )}
          ListHeaderComponent={
            <View style={styles.header}>
              <View>
                <AppText style={styles.text}>Cart 🛒</AppText>
                <AppText style={[styles.text, { fontSize: 17 }]}>
                  We take Care of your gifts.🎁
                </AppText>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <View>
                <Text>Order Summary :</Text>
                <Text style={styles.summaryText}>
                  {"No of Items : " + noOfItems + " items"}
                </Text>
                <Text style={styles.summaryText}>
                  {"Taxes fees :" + taxes + " ﷼"}
                </Text>
                <Text style={styles.summaryText}>
                  {"Shipping Fees :" + shippingPrice + " ﷼"}
                </Text>
                <Text style={styles.summaryText}>
                  {" "}
                  {"Total Price :" + totalPrice + " ﷼"}
                </Text>
              </View>
              <AppButton
                loading={loading}
                style={styles.payButton}
                title="Order now"
                onPress={handleOrderUpload}
              />
            </View>
          }
          ListFooterComponentStyle={{ bottom: 0 }}
          ListHeaderComponentStyle={styles.header}
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
              image={item.imageURL}
            />
          )}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: "80%",
    height: "90%",
    backgroundColor: colors.white,
    alignSelf: "center",
    marginTop: 40,
  },
  noCartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noCartText: {
    color: colors.darkGray,
  },
  noCartIcon: {
    marginVertical: 10,
  },
  flatList: { zIndex: -1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  footer: {
    backgroundColor: colors.creamy,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
  summaryText: {
    fontSize: 18,
    backgroundColor: colors.white,
    marginTop: 5,
    paddingLeft: 10,
  },
  closeButton: {
    alignSelf: "center",
    zIndex: 1,
    width: "30%",
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    top: -5,
    position: "absolute",
  },
  payButton: {
    marginTop: 15,
  },
  text: {
    color: colors.darkGray,
    fontSize: 45,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
