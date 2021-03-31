import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Modal } from "react-native";
import firebase from "firebase";
import cache from "../utility/cache";


import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LoginScreen from "./LoginScreen";
import AddItemScreen from "./AddItemScreen";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const [visible, setvisible] = useState(false);
  const [user, setUser] = useState();

  const getStateFromCache = async ()=>{
    const userFromCahce = await cache.get('user')
    if (userFromCahce) setUser(userFromCahce)
  }
  useEffect(() => {
    if (!user) getStateFromCache()
  }, [user])

  const handleSignOut = ()=>{
    firebase.auth().signOut().then(()=> {setUser()
      cache.remove('user')
  })
  
  }

  if (!user) return <LoginScreen style={styles.loginScreen} userLoggedIn={(res)=> setUser(res)} inModal={false} />;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.text}>{user.phoneNumber}</AppText>
        <View style={styles.icon}>
          <AppText style={{ fontSize: 75 }}>👳‍♂️</AppText>
        </View>
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
  loginScreen:{
    borderRadius: 0,
    width: "100%",
    height: "100%",
    paddingTop:20,
    padding: 25,
    backgroundColor: colors.white,
    alignSelf:'center'
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
