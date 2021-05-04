import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

import colors from "../config/colors";

const InputField = ({
  placeholder,
  column = false,
  error,
  touched,
  children,
  ...otherProps
}) => {
  const [focused, setfocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: column ? "column" : "row",
          borderBottomColor:
            touched && error
              ? colors.red
              : focused
              ? colors.blueLight
              : colors.creamy,
        },
      ]}
    >
      {children}
      <TextInput
        style={styles.InputField}
        onFocus={() => setfocus(true)}
        placeholder={placeholder}
        {...otherProps}
      />
      {!touched || (error && <Text style={styles.error}>{error}</Text>)}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  InputField: {
    width: "100%",
    textAlign: "right",
  },
  error: {
    paddingTop: 3,
    fontSize: 16,
    color: "red",
  },
});
