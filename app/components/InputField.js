import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import colors from "../config/colors";

const InputField = ({ placeholder, ...otherProps }) => {
  const [focused, setfocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: focused ? colors.blueLight : colors.creamy },
      ]}
    >
      <TextInput
        style={styles.input}
        onFocus={() => setfocus(true)}
        onBlur={() => setfocus(false)}
        {...otherProps}
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  input: {
    fontSize: 18,
    fontWeight: "500",
  },
});
