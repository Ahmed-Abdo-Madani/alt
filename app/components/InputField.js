import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

import colors from "../config/colors";

const InputField = ({ placeholder, error, touched, ...otherProps }) => {
  const [focused, setfocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor:
            touched && error
              ? colors.red
              : focused
              ? colors.blueLight
              : colors.creamy,
        },
      ]}
    >
      <TextInput
        style={styles.input}
        onFocus={() => setfocus(true)}
        {...otherProps}
        placeholder={placeholder}
      />
      {!touched || (error && <Text style={styles.error}>{error}</Text>)}
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
  error: {
    paddingTop: 3,
    fontSize: 16,
    color: "red",
  },
});
