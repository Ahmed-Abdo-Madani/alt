import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Modal } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

import cache from "../utility/cache";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LoginScreen from "./LoginScreen";
import AddItemScreen from "./AddItemScreen";
import { USER_LOGIN } from "../constants/userConstants";

const ProfileScreen = ({ navigation }) => {
  const [visible, setvisible] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: USER_LOGIN,
          payload: null,
        });
        cache.remove("user");
        cache.remove("cartItems");
      });
  };

  if (!userInfo)
    return <LoginScreen style={styles.loginScreen} inModal={false} />;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.text}>userName</AppText>
          <AppText style={styles.text}>{userInfo.phoneNumber}</AppText>
        </View>
        <View style={styles.icon}>
          <AppText style={{ fontSize: 75, color: colors.white }}>U</AppText>
        </View>
      </View>

      <ScrollView style={styles.tabsContainer}>
        <ListItem
          profileItem
          iconName="clipboard-text-outline"
          title="orders"
          onPress={() => navigation.navigate("orders")}
        />
        <ListItem
          profileItem
          iconName="map-marker"
          title="My Address"
          onPress={() => navigation.navigate("map")}
        />
        <ListItem profileItem iconName="hammer-wrench" title="Settings" />
        <ListItem
          profileItem
          iconName="plus"
          title="Add Item"
          onPress={() => setvisible(true)}
        />
        <ListItem
          profileItem
          iconName="logout"
          title="Log out"
          onPress={handleSignOut}
        />
      </ScrollView>
      <Modal
        transparent={true}
        presentationStyle="overFullScreen"
        animationType="slide"
        visible={visible}
      >
        <View style={styles.modal}>
          <AddItemScreen closeModal={() => setvisible(false)} />
        </View>
      </Modal>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 35,
  },
  loginScreen: {
    borderRadius: 0,
    width: "100%",
    height: "100%",
    paddingTop: 20,
    padding: 25,
    backgroundColor: colors.white,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.creamyDark,
  },
  text: {
    color: colors.lightGray,
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    margin: 10,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    backgroundColor: colors.lightGray,
  },
  image: {
    width: "100%",
    height: 200,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
});
