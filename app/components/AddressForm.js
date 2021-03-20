import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";


import colors from "../config/colors";
import AppText from "../components/AppText";
import GoBackButton from "../components/GoBackButton";
import AppButton from "../components/AppButton";
import InputField from "../components/InputField";

import cache from "../utility/cache";
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Full Name"),
  city: Yup.string().required().label("City"),
  block: Yup.string().required().label("Block Name"),
  street: Yup.string().required().label("Street"),
  buildingNo: Yup.string().required().label("Building No"),
});

const AddressForm = ({ route }) => {
  const { id, data } = route.params;
  const { name, price, imageURL: image } = data;

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

  const handleAddToCart = async (requestDetails) => {
    const key = "cartItems";
    const cartInCache = await cache.get(key);
    const checkCart = cartInCache ? cartInCache : [];
    cache.store(key, [
      { id, title: name, price, image, requestDetails },
      ...checkCart,
    ]);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GoBackButton name="close" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.textContainer}
      >

          <AppText style={styles.subtext}>
            This file contains additional information, probably added from the
            digital camera or scanner used to create or digitize it.
          </AppText>


          <Text style={styles.inputFormHeader}>Address Details</Text>

          <Formik
            initialValues={{ name: "", title: "" }}
            onSubmit={(values) => handleAddToCart(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <>
                <InputField
                  autoCorrect={false}
                  onChangeText={handleChange("name")}
                  placeholder="name ..."
                  onBlur={() => {
                    setFieldTouched("name");
                  }}
                  error={errors.name}
                  touched={touched.name}
                />

                <InputField
                  autoCorrect={false}
                  onChangeText={handleChange("title")}
                  placeholder="job title ..."
                  onBlur={() => {
                    setFieldTouched("title");
                  }}
                  error={errors.title}
                  touched={touched.title}
                />

                <View style={styles.buttonContainer}>
                  <AppButton
                    style={styles.cartButton}
                    shadow={false}
                    onPress={handleSubmit}
                    textColor={colors.blueLight}
                    title="Add to Cart"
                  />
                  <AppButton
                    onPress={handleSubmit}
                    style={styles.buyButton}
                    title="Buy Now"
                  />
                </View>
              </>
            )}
          </Formik>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressForm;

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

    width: "100%",
  },
  cartButton: {
    width: "60%",
    backgroundColor: colors.white,
  },
  buyButton: {
    width: "40%",
  },
});
