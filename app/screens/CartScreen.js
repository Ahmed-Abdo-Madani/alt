import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { saveOrdersToFirestore } from "../actions/ordersActions";
import { ORDER_SAVE_FIRESTORE_RESET } from "../constants/ordersConstants";

const CartScreen = ({ style }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { shippingAddresss } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, error, savedToFireStore } = useSelector(
    (state) => state.orders
  );

  const totp = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  useEffect(() => {
    if (shippingAddresss === null)
      navigation.navigate("profileStack", { screen: "map" });
    return () => {
      dispatch({ type: ORDER_SAVE_FIRESTORE_RESET });
    };
  }, []);

  const handleOrderUpload = async () => {
    dispatch(saveOrdersToFirestore());
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.closeButton} />
      {savedToFireStore ? (
        <View style={styles.noCartContainer}>
          <MaterialCommunityIcons
            style={[styles.noCartIcon]}
            name="cart-arrow-up"
            size={75}
            color={colors.blueLight}
          />
          <AppText style={styles.noCartText}>تم إرسال طلبك بنجاح ✅🪁,</AppText>
          <AppText style={styles.noCartText}>سنتواصل معك قريباً.</AppText>
        </View>
      ) : !cartItems || cartItems?.length === 0 ? (
        <View style={styles.noCartContainer}>
          <MaterialCommunityIcons
            style={[styles.noCartIcon]}
            name="cart-remove"
            size={75}
            color={colors.blueDark}
          />
          <AppText style={styles.noCartText}>لا يوجد شئ في العربة 😢</AppText>
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
              <View style={styles.innerheader}>
                <AppText style={styles.text}>العربة 🛒</AppText>
                <AppText style={[styles.text, { fontSize: 17 }]}>
                  هداياك مصنعة خصيصا لك.🎁
                </AppText>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <View>
                <Text style={styles.summaryHeader}>ملخص الطلب :</Text>

                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>عدد القطع :</Text>
                  <Text style={styles.summaryText}>
                    {cartItems.length} {cartItems.length <= 2 ? "قطعه" : "قطع"}
                  </Text>
                </View>

                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>المجموع الجزئي :</Text>
                  <Text style={styles.summaryText}> {totp + " ﷼"}</Text>
                </View>

                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>الضريبه :</Text>
                  <Text style={styles.summaryText}>
                    {Number(totp * 0.15).toFixed(2) + " ﷼"}
                  </Text>
                </View>

                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>رسوم الشحن :</Text>
                  <Text style={styles.summaryText}> {10 + " ﷼"}</Text>
                </View>

                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>المجموع الاجمالي: </Text>
                  <Text style={styles.summaryText}>
                    {totp + totp * 0.15 + 10 + " ﷼"}
                  </Text>
                </View>
              </View>
              <AppButton
                loading={loading}
                style={styles.payButton}
                title="أرسل الطلب"
                onPress={handleOrderUpload}
              />
            </View>
          }
          ListFooterComponentStyle={{ bottom: 0 }}
          ListHeaderComponentStyle={styles.header}
          renderItem={({ item }) => {
            return (
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
            );
          }}
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
    marginTop: 10,
  },
  noCartIcon: {
    marginVertical: 10,
  },
  flatList: { zIndex: -1 },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  innerheader: {
    alignItems: "flex-end",
  },
  footer: {
    backgroundColor: colors.creamy,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
  summaryHeader: {
    fontSize: 22,
    textAlign: "right",
    padding: 10,
  },
  summaryTextContainer: {
    paddingHorizontal: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  summaryText: {
    fontSize: 18,
    textAlign: "right",
    backgroundColor: colors.white,
    marginTop: 5,
    paddingHorizontal: 10,
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
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
