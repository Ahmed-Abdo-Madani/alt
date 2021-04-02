import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppIcon from "../components/AppIcon";
import cache from "../utility/cache";

const CartScreen = ({ closeModal, style }) => {
  const [cart, setcart] = useState();
  const [address, setaddress] = useState();
  const [user, setuser] = useState();
  const [loading, setloading] = useState(false);
  const [orderSent, setorderSent] = useState(false);

  const handleOrderUpload = async () => {
    setloading(true);
    try {
      await firebase
        .firestore()
        .collection("orders")
        .add({ cart, address, user })
        .then(() => {
          emptyCart();
        });
    } catch (error) {
      console.log(error);
    }
    if (orderSent) {
      const targetExpoPushToken = "ExponentPushToken[5zMoeBGjA-SrzanQtYRTFW]";
      const message = "new Order: " + user.phoneNumber;
    }
  };

  const emptyCart = () => {
    cache.remove("cartItems");
    setorderSent(true);
    setloading(false);
  };
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    const cartInCache = await cache.get("cartItems");
    const addressInCache = await cache.get("address");
    const userInCache = await cache.get("user");
    setcart(cartInCache);
    setaddress(addressInCache);
    setuser(userInCache);
  };

  return (
    <View style={[styles.container, style]}>
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />
      {!cart ? (
        <View style={styles.noCartContainer}>
          <MaterialCommunityIcons
            style={[styles.noCartIcon]}
            name="cart-remove"
            size={75}
            color={colors.blueDark}
          />
          <AppText style={styles.noCartText}>Nothing in The Cart</AppText>
        </View>
      ) : orderSent ? (
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
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={cart}
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
            <View style={styles.header}>
              <AppButton
                loading={loading}
                style={styles.payButton}
                title="Order now"
                onPress={handleOrderUpload}
              />
            </View>
          }
          ListHeaderComponentStyle={styles.header}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
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
  closeButton: {
    alignSelf: "flex-end",
    zIndex: 1,
    top: 10,
    right: 10,
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
