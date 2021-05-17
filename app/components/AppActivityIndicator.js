import React from "react";
import LottieViewer from "lottie-react-native";
import { View } from "react-native";

export default function AppActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieViewer
        resizeMode="contain"
        style={{ width: "45%" }}
        loop
        autoPlay
        source={require("../assets/animation/8802-loading-animation.json")}
      />
    </View>
  );
}
