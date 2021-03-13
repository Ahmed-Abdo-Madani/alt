import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Modal } from "react-native";
import firebase from "firebase";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LoginScreen from "./LoginScreen";
import AddItemScreen from "./AddItemScreen";

const HomeScreen = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setloaded(true);
        setloggedIn(false);
      } else {
        setloaded(true);
        setloggedIn(true);
      }
    });
  }, []);
  if (!loggedIn) return <LoginScreen />;
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInitials}>
          <AppText style={styles.text}>👳‍♂️</AppText>
        </View>
      </View>
      <ScrollView style={styles.tabsContainer}>
        <ListItem iconName="clipboard-text-outline" title="orders" />
        <ListItem iconName="hammer-wrench" title="Settings" />
        <ListItem
          iconName="plus"
          title="Add Item"
          onPress={() => setvisible(true)}
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 35,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.creamyDarkTrans,
    width: "100%",
    padding: 50,
  },
  userInitials: {
    position: "absolute",
    bottom: -25,
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  text: {
    color: colors.white,
    fontSize: 75,
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
