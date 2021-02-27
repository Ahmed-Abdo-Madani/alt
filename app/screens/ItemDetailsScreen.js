import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Keyboard,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";

import colors from "../config/colors";
import AppText from "../components/AppText";
import GoBackButton from "../components/GoBackButton";
import AppButton from "../components/AppButton";
import InputField from "../components/InputField";

const ItemDetailsScreen = ({ closeModal, item }) => {
  const [imageHeight, setImageHeight] = useState(300);
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", handleImageHide);
    Keyboard.addListener("keyboardWillHide", handleImageShow);
    return () => {
      Keyboard.removeListener("keyboardWillShow", handleImageHide);
      Keyboard.removeListener("keyboardWillHide", handleImageShow);
    };
  }, []);
  const handleImageHide = () => {
    setImageHeight(100);
  };
  const handleImageShow = () => {
    setImageHeight(300);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GoBackButton onPress={closeModal} name="close" />

      <Image
        style={[styles.image, { height: imageHeight }]}
        source={item.image}
      />
      <ScrollView
        sna
        showsVerticalScrollIndicator={false}
        style={styles.textContainer}
      >
        <View style={styles.titleConatainer}>
          <AppText style={styles.text}>{item.title}</AppText>
          <AppText style={styles.text}>{item.subtitle}</AppText>
        </View>
        <View style={styles.subtitleConatainer}>
          <AppText style={styles.subtext}>
            This file contains additional information, probably added from the
            digital camera or scanner used to create or digitize it.
          </AppText>
        </View>
        <View style={styles.formCard}>
          <Text style={styles.inputFormHeader}>item details</Text>
          <Formik
            initialValues={{ name: "", title: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleSubmit }) => (
              <>
                <InputField placeholder="name ..." />
                <InputField placeholder="job title ..." />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton
          style={styles.cartButton}
          shadow={false}
          textColor={colors.blueLight}
          title="Add to Cart"
        />
        <AppButton style={styles.buyButton} title="Buy Now" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  image: {
    width: "100%",
  },
  textContainer: {
    padding: 10,
  },
  titleConatainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  text: {
    paddingBottom: 5,
    fontSize: 22,
    fontWeight: "bold",
    color: colors.lightGray,
  },
  subtext: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  formCard: {
    width: "100%",
    padding: 15,
    marginVertical: 15,
    borderTopWidth: 35,
    borderTopColor: colors.creamy,
    borderRadius: 15,
    backgroundColor: colors.white,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowColor: "black",
  },
  inputFormHeader: {
    position: "absolute",
    top: -27,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.lightGray,
  },
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  cartButton: {
    width: "60%",
    backgroundColor: colors.white,
  },
  buyButton: {
    width: "40%",
  },
});
