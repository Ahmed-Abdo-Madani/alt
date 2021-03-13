import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import InputField from "../components/InputField";
import ImagePicker from "../components/AppImagePicker";
import colors from "../config/colors";
import AppIcon from "../components/AppIcon";

const handleUpload = async () => {};

const AddItemScreen = ({ closeModal }) => {
  const [image, setimage] = useState();

  const onSelect = (imageURI) => {
    setimage(imageURI);
  };

  return (
    <View style={styles.container}>
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />
      <ImagePicker onSelect={onSelect} imageURI={image} />
    </View>
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
});
