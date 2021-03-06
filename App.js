import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBQjCScPiH1kMvuXWi0xVwtNj3iAo1UOHc",
  authDomain: "altayar-2021.firebaseapp.com",
  projectId: "altayar-2021",
  storageBucket: "altayar-2021.appspot.com",
  messagingSenderId: "622653479229",
  appId: "1:622653479229:web:69e72faf73bb618d16cd54",
  measurementId: "G-JTGJX916N3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
