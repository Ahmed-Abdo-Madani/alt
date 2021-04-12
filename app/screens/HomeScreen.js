import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TextInput, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import constants from "expo-constants";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppIcon from "../components/AppIcon";
import { HeroSlider } from "../components/HeroSlider";

import LoginScreen from "./LoginScreen";
import CartScreen from "./CartScreen";

import { getHomeItems } from "../actions/itemsAction";
import AppActivityIndicator from "../components/AppActivityIndicator";

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState();
  const [searchItems, setsearchItems] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);
  const getHomeScreenItems = useSelector((state) => state.getHomeScreenItems);
  const { loading, error, items } = getHomeScreenItems;

  const HeroImages = [
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeItems());
    if (route.params?.addedToCart) setVisible(true);
  }, [route.params]);

  const filterSet = () => {
    const res = items?.filter((item) => {
      return item.data.name.includes(searchText);
    });
    setsearchItems(res);
  };
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
          data={!searchItems ? items : searchItems}
          refreshing={refreshing}
          onRefresh={() => {
            dispatch(getHomeItems(true));
          }}
          keyExtractor={(item) => item.id}
          ListHeaderComponentStyle={
            {
              /* marginBottom: 190,
            backgroundColor: colors.darkGray,
            paddingTop: constants.statusBarHeight, */
            }
          }
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <View>
                  <AppText style={styles.text}>Welcome 👋</AppText>
                  <AppText style={[styles.text, { fontSize: 21 }]}>
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

              <View style={styles.serachBar}>
                <TextInput
                  style={styles.input}
                  placeholder="Search here ..."
                  onChangeText={(txt) => setSearchText(txt)}
                  value={searchText}
                />
                <AppIcon onPress={() => filterSet()} name="magnify" />
              </View>

              {/* <HeroSlider images={HeroImages} /> */}
            </>
          }
          ListFooterComponent={
            <View style={styles.header}>
              <AppText style={styles.text}>Thank u 😊</AppText>
              <AppText style={[styles.text, { fontSize: 27 }]}>
                We hope u come back 🙌
              </AppText>
            </View>
          }
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
              closeModal={(anyCallback) => {
                setVisible(false);
                anyCallback;
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
  serachBar: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderRadius: 25,
    backgroundColor: colors.creamyDark,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});
