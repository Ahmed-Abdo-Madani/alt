import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppIcon from "../components/AppIcon";
import cache from "../utility/cache";
import { useSelector } from "react-redux";

const CartScreen = ({ closeModal, style }) => {
  const [cart, setcart] = useState();
  const [loading, setloading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo,shippingAddress } = userLogin;

  const handleOrderUpload = async () => {
    setloading(true);
    try {
      await firebase
        .firestore()
        .collection("orders")
        .add({ cart, shippingAddress, userInfo })
        .then(() => setloading(false));
    } catch (error) {
      console.log(error);
    }
  };
  const inCart = () => {
    console.log(cart);
  };
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    const cartInCache = await cache.get("cartItems");
    setcart(cartInCache);
  };

  return (
    <View style={[styles.container, style]}>
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />
      {cart && (
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
                style={styles.payButton}
                title="Order now"
                onPress={inCart}
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
