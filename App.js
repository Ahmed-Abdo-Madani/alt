import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { LogBox } from "react-native";
import firebase from "firebase/app";
import { Provider } from "react-redux";

import store from "./app/store";

LogBox.ignoreAllLogs(true);

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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppNavigator />
    </Provider>
  );
}
