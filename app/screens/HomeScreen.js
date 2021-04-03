import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppIcon from "../components/AppIcon";

import LoginScreen from "./LoginScreen";
import CartScreen from "./CartScreen";

import { getHomeItems } from "../actions/itemsAction";
import AppActivityIndicator from "../components/AppActivityIndicator";

const HomeScreen = ({ navigation,route }) => {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const getHomeScreenItems = useSelector((state) => state.getHomeScreenItems);
  const { loading, error, items } = getHomeScreenItems;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeItems());
    if ( route.params?.addedToCart ) setVisible(true)
  }, [route.params]);

  return (
    <Screen>
      {loading ? (
        <>
          <AppActivityIndicator visible={loading} />
          <AppText
            style={[
              styles.text,
              {
                color: colors.darkGray,
                fontSize: 15,
                alignSelf: "center",
                position: "absolute",
                top: "75%",
              },
            ]}
          >
            Loading ...
          </AppText>
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={items}
          refreshing={refreshing}
          onRefresh={() => {
            dispatch(getHomeItems(true));
          }}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.header}>
              <View>
                <AppText style={styles.text}>Welcome 👋</AppText>
                <AppText style={[styles.text, { fontSize: 27 }]}>
                  To a World of gifts.🎁
                </AppText>
              </View>
              <View style={styles.headerIconCintainer}>
                <AppIcon
                  style={styles.headerIcon}
                  name="cart"
                  onPress={() => setVisible(true)}
                />
                <AppIcon
                  style={styles.headerIcon}
                  name="apps"
                  onPress={() => setVisible(true)}
                />
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={styles.header}>
              <AppText style={styles.text}>Thank u 😊</AppText>
              <AppText style={[styles.text, { fontSize: 27 }]}>
                We hope u come back 🙌
              </AppText>
            </View>
          }
          ListHeaderComponentStyle={styles.header}
          renderItem={({ item }) => (
            <Card
              home
              id={item.id}
              title={item.data.name}
              subtitle={item.data.price}
              image={item.data.imageURL}
              onPress={() => navigation.navigate("itemDetails", item)}
            />
          )}
        />
      )}

      <Modal
        transparent={true}
        presentationStyle="overFullScreen"
        animationType="slide"
        visible={visible}
      >
        <View style={styles.login}>
          {userInfo ? (
            <CartScreen
              closeModal={() => {
                setVisible(false);
              }}
            />
          ) : (
            <LoginScreen closeModal={() => setVisible(false)} />
          )}
        </View>
      </Modal>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    width: "100%",
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconCintainer: {
    flexDirection: "row",
  },
  headerIcon: {
    margin: 5,
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
