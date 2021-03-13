import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";

import InputField from "../components/InputField";
import ImagePicker from "../components/AppImagePicker";
import colors from "../config/colors";
import AppIcon from "../components/AppIcon";
import AppButton from "../components/AppButton";

const handleUpload = async () => {};

const AddItemScreen = ({ closeModal }) => {
  const [image, setimage] = useState();
  const [title, settitle] = useState();
  const [price, setprice] = useState();
  const [imageHeight, setImageHeight] = useState(200);

  const handleImageHide = () => {
    setImageHeight(50);
  };
  const handleImageShow = () => {
    setImageHeight(200);
  };

  const onSelect = (imageURI) => {
    setimage(imageURI);
  };
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", handleImageHide);
    Keyboard.addListener("keyboardWillHide", handleImageShow);
    return () => {
      Keyboard.removeListener("keyboardWillShow", handleImageHide);
      Keyboard.removeListener("keyboardWillHide", handleImageShow);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />
      <ImagePicker
        onSelect={onSelect}
        style={[styles.imagePicker, { height: imageHeight }]}
        imageURI={image}
      />
      <InputField
        placeholder="name"
        autoCorrect={false}
        onChangeText={(text) => settitle(text)}
      />
      <InputField
        placeholder="price"
        keyboardType="numeric"
        autoCorrect={false}
        onChangeText={(text) => setprice(text)}
      />
      <AppButton title="submit" style={styles.submitButton} />
    </KeyboardAvoidingView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: "80%",
    height: "90%",
    padding: 25,
    backgroundColor: colors.white,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  imagePicker: {
    marginBottom: 25,
  },
  submitButton: {
    marginTop: 25,
  },
});
