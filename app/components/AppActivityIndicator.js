import React from "react";
import LottieViewer from "lottie-react-native";

export default function AppActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <LottieViewer
      resizeMode="center"
      loop
      autoPlay
      source={require("../assets/animation/wave.json")}
    />
  );
}
