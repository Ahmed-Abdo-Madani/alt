import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Modal } from "react-native";
import firebase from "firebase";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LoginScreen from "./LoginScreen";
import AddItemScreen from "./AddItemScreen";
import cache from "../utility/cache";

const ProfileScreen = ({ navigation }) => {

  const [visible, setvisible] = useState(false);
  const [userState, setuserState] = useState();

  const getUserState = async()=>{
    const {phoneNumber} =await cache.get('user')
    if (phoneNumber) setuserState(phoneNumber)
  }

  const handleSignOut = ()=>{
    firebase.auth().signOut().then(()=> {console.log('user Signed out')
    setuserState()
  })
  }

  useEffect(() => {
    !userState && getUserState()
  }, []);

  if (!userState) return <LoginScreen />;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <AppText style={{ fontSize: 75 }}>👳‍♂️</AppText>
        </View>
        <AppText style={styles.text}>{userState? userState : "No User"}</AppText>
      </View>

      <ScrollView style={styles.tabsContainer}>
        <ListItem
          iconName="clipboard-text-outline"
          title="orders"
          onPress={() => navigation.navigate("orders")}
        />
        <ListItem
          iconName="map-marker"
          title="My Address"
          onPress={() => navigation.navigate("map")}
        />
        <ListItem iconName="hammer-wrench" title="Settings" />
        <ListItem
          iconName="plus"
          title="Add Item"
          onPress={() => setvisible(true)}
        />
        <ListItem
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
