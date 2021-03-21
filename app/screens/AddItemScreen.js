import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  View,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";
import { Picker } from "@react-native-picker/picker";

import InputField from "../components/InputField";
import ImagePicker from "../components/AppImagePicker";
import colors from "../config/colors";
import AppIcon from "../components/AppIcon";
import AppButton from "../components/AppButton";

const AddItemScreen = ({ closeModal }) => {
  const [image, setimage] = useState();
  const [title, settitle] = useState();
  const [loading, setloading] = useState(false);
  const [price, setprice] = useState();
  const [category, setcategory] = useState("gifts");
  const [description, setdescription] = useState();
  const [imageHeight, setImageHeight] = useState(200);

  const handleItemUpload = async (uri) => {
    setloading(true);
    await firebase
      .firestore()
      .collection("items")
      .add({ imageURL: uri, name: title, price, category, description })
      .then(() => setloading(false));
  };

  const handleUpload = async (uri) => {
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
          placeholder="name..."
          autoCorrect={false}
          onChangeText={(text) => settitle(text)}
        />
        <InputField
          placeholder="price..."
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText={(text) => setprice(text)}
        />
        <InputField
          placeholder="description..."
          autoCorrect={false}
          onChangeText={(text) => setdescription(text)}
        />
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Office" value="office" />
          <Picker.Item label="Home" value="home" />
          <Picker.Item label="Luxurious" value="luxurious" />
          <Picker.Item label="Gifts" value="gifts" />
          <Picker.Item label="Offical" value="offical" />
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