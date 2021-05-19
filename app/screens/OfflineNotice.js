import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="cloud-off-outline"
          size={115}
          color={colors.blueLight}
        />
        <Text style={{ fontSize: 18, marginTop: 15, color: colors.lightGray }}>
          No Internet Connection{" "}
        </Text>
      </View>
    );

  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
