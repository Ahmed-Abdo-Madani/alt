import React from "react";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";

const SvgAnimationScreen = () => {
  const value = useState(new Animated.Value(0))[0];
  function animate() {
    Animated.timing(value, {
      toValue: 100,
      duration: 1000,

      easing: EasingNode.bezier(0.37, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.object, { marginLeft: value }]} />

      <Text onPress={animate}>Click</Text>
    </View>
  );
};

export default SvgAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  object: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    marginVertical: 30,
  },
  button: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
