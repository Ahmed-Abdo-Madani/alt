import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

import logger from "../utility/logger";

import { saveShippingAddress } from "../actions/userActions";
export default function App({ navigation }) {
  const [location, setLocation] = useState();
  const [address, setaddress] = useState();
  const dispatch = useDispatch();

  const APIKey = "AIzaSyCFZiKHM81khjpSkA5I_bq1DqU8iCGRqVU";

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync(); //FIXME returns unidentified in android
      setLocation({ latitude, longitude });
    } catch (error) {
      logger.log(error);
    }
  };

  const handleSaveingAddress = () => {
    dispatch(saveShippingAddress(address));
    navigation.goBack();
  };
  const getAddress = async (myLat, myLon) => {
    try {
      await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          myLat +
          "," +
          myLon +
          "&key=" +
          APIKey
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setaddress(responseJson.results[0].formatted_address);
        });
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <>
          <View style={styles.closeButton} />
          <View style={styles.navbar}>
            <AppText style={styles.textInfo}>Seleted address :</AppText>
            <AppText numberOfLines={3} style={styles.text}>
              {address}
            </AppText>
            <AppButton
              onPress={handleSaveingAddress}
              style={styles.button}
              title="استخدم هذا العنوان"
            />
          </View>

          <MapView
            onRegionChange={(region) => {
              setLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
            onRegionChangeComplete={(region) => {
              setLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
              getAddress(region.latitude, region.longitude);
            }}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={location}
              title="this is a marker"
              description="this is a marker example"
            />
          </MapView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "90%",
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
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
  navbar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.creamyDark,
    zIndex: 1,
    padding: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  button: { marginVertical: 10 },
  text: { marginVertical: 10 },
  textInfo: { color: colors.lightGray, alignSelf: "flex-start" },
  map: {
    zIndex: -1,
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
});
