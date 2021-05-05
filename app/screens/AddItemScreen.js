import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  View,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";
import { Picker } from "@react-native-picker/picker";

import categories from "../constants/categories";
import InputField from "../components/InputField";
import ImagePicker from "../components/AppImagePicker";
import colors from "../config/colors";
import AppIcon from "../components/AppIcon";

const AddItemScreen = ({ closeModal }) => {
  const [image, setimage] = useState();
  const [title, settitle] = useState();
  const [uploading, setUploading] = useState(false);
  const [price, setprice] = useState();
  const [category, setcategory] = useState("هدايا");
  const [description, setdescription] = useState();
  const [imageHeight, setImageHeight] = useState(200);

  const handleItemUpload = async (uri) => {
    await firebase
      .firestore()
      .collection("items")
      .add({ imageURL: uri, name: title, price, category, description })
      .then(() => setUploading(false));
  };

  const handleUpload = async (uri) => {
    setUploading(true);
    setimage();
    const imagePath = `items_images/${Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(imagePath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred : ${snapshot.bytesTransferred}`);
    };
    const taskError = (snapshot) => {
      console.log(`Error : ${snapshot}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        handleItemUpload(snapshot);
      });
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

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
  if (uploading)
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          animating={uploading}
          color={colors.blueLight}
        />
      </View>
    );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.buttonsContainer}>
        <AppIcon
          style={styles.closeButton}
          onPress={closeModal}
          name="close"
          iconColor={colors.darkGray}
        />
        <AppIcon
          style={{
            backgroundColor:
              image && title && price && category && description
                ? colors.green
                : colors.red,
          }}
          disabled={image && title && price && category ? false : true}
          onPress={() => handleUpload(image)}
          name="check-bold"
          iconColor={colors.white}
        />
      </View>
      <ScrollView>
        <ImagePicker
          onSelect={onSelect}
          style={[styles.imagePicker, { height: imageHeight }]}
          imageURI={image}
        />
        <InputField
          placeholder="الاسم..."
          autoCorrect={false}
          onChangeText={(text) => settitle(text)}
        />
        <InputField
          placeholder="السعر..."
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText={(text) => setprice(text)}
        />
        <InputField
          placeholder="الوصف..."
          autoCorrect={false}
          onChangeText={(text) => setdescription(text)}
        />
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
          mode="dropdown"
        >
          {categories.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: "80%",
    height: "92%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  closeButton: {
    alignSelf: "flex-start",
  },
  imagePicker: {
    marginBottom: 25,
  },
  submitButton: {},
  picker: {},
});
