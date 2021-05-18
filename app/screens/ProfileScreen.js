import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Modal } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cache from "../utility/cache";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LoginScreen from "./LoginScreen";
import AddItemScreen from "./AddItemScreen";
import { USER_LOGIN } from "../constants/userConstants";

const ProfileScreen = ({ navigation }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { admins } = useSelector((state) => state.notifications);
  const [visible, setvisible] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [logoutPressed, setlogoutPressed] = useState(false);

  const checkForAdmins = () => {
    const admin = admins?.filter((admin) => admin.id === userInfo?.phoneNumber); // FIXME fix filter undefined in reboot & add getAdmins() dispatch in appNavigator
    if (admin?.length !== 0) setisAdmin(true);
  };
  useEffect(() => {
    checkForAdmins();

    return () => {
      setvisible(false);
      setlogoutPressed(false);
      setisAdmin(false);
    };
  }, [userInfo]);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    setlogoutPressed(true);
    cache.remove("user");
    cache.remove("cartItems");
    dispatch({
      type: USER_LOGIN,
      payload: null,
    });
    firebase.auth().signOut();
  };

  if (!userInfo)
    return <LoginScreen style={styles.loginScreen} inModal={false} />;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          style={{ marginRight: 15 }}
          name="account-circle"
          size={70}
          color={colors.blueDark}
        />
        <View>
          <AppText style={[styles.text, { color: colors.blueDark }]}>
            {userInfo.userName}
          </AppText>
          <AppText style={styles.text}>{userInfo.phoneNumber}</AppText>
        </View>
      </View>

      <ScrollView style={styles.tabsContainer}>
        <ListItem
          profileItem
          iconName="cart"
          title="العربة"
          onPress={() => navigation.navigate("cart")}
        />
        {isAdmin ? (
          <ListItem
            profileItem
            iconName="clipboard-text-outline"
            title="طلبات المتجر"
            onPress={() => navigation.navigate("orders", isAdmin)}
          />
        ) : (
          <ListItem
            profileItem
            iconName="clipboard-text-outline"
            title="الطلبات"
            onPress={() => navigation.navigate("orders")}
          />
        )}
        {/*   <ListItem
          profileItem
          iconName="cash"
          title="payment"
          onPress={() => navigation.navigate("pay")}
        /> */}
        <ListItem
          profileItem
          iconName="map-marker"
          title="العنوان"
          onPress={() => navigation.navigate("map")}
        />
        <ListItem
          profileItem
          iconName="server"
          title="animated"
          onPress={() => navigation.navigate("animate")}
        />
        {/*   <ListItem
          profileItem
          iconName="traffic-cone"
          title="Delivery Track"
          onPress={() => navigation.navigate("track")}
        /> */}
        {isAdmin && (
          <ListItem
            profileItem
            iconName="plus"
            title="أضف منتج"
            onPress={() => setvisible(true)}
          />
        )}
        <ListItem
          loading={logoutPressed}
          profileItem
          iconName="logout"
          title="تسجيل الخروج"
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
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.creamyDark,
  },
  text: {
    color: colors.lightGray,
    fontSize: 21,
    marginBottom: 5,
    fontWeight: "bold",
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
