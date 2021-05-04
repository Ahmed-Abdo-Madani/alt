import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Image } from "react-native-expo-image-cache";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../actions/cartActions";
import colors from "../config/colors";
import AppText from "../components/AppText";
import GoBackButton from "../components/GoBackButton";
import AppButton from "../components/AppButton";
import InputField from "../components/InputField";

import LoginScreen from "./LoginScreen";
import { useNavigation } from "@react-navigation/core";

const validationSchema = Yup.object().shape({
  request: Yup.string().required().label("Request"),
});

const ItemDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const { id, data, request } = route.params;
  const { name, price, imageURL: image, description } = data;

  const [addingToCart, setaddingToCart] = useState(false);
  const [imageHeight, setImageHeight] = useState(300);
  const [visible, setVisible] = useState(false);

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

  const dispatchAddToCart = (requestDetails) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        imageURL: image,
        description,
        requestDetails,
      })
    );
  };
  const handleAddToCart = async (requestDetails) => {
    setaddingToCart(true);
    if (userInfo) {
      dispatchAddToCart(requestDetails);
      navigation.navigate("homeCart");
      setaddingToCart(false);
    } else {
      dispatchAddToCart(requestDetails);
      // setVisible(true);
      setaddingToCart(false);
      navigation.navigate("profileStack");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GoBackButton style={styles.goBack} name="close" />
      <Image style={[styles.image, { height: imageHeight }]} uri={image} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.textContainer}
      >
        <View style={styles.titleConatainer}>
          <AppText style={styles.text}>{name}</AppText>
          <AppText style={styles.text}>{price}</AppText>
        </View>
        <View style={styles.subtitleConatainer}>
          <AppText numberOfLines={3} style={styles.subtext}>
            {description}
          </AppText>
        </View>
        <View style={styles.formCard}>
          <Text style={styles.inputFormHeader}>تفاصيل الطلب</Text>
          <Formik
            initialValues={{ request: "" }}
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
                  column
                  autoCorrect={false}
                  onChangeText={handleChange("request")}
                  multiline={true}
                  placeholder={
                    request ? request.request : "أكتب تفاصيل طلبك هنا ..."
                  }
                  onBlur={() => {
                    setFieldTouched("request");
                  }}
                  error={errors.request}
                  touched={touched.request}
                />
                <View style={styles.buttonContainer}>
                  {!request ? (
                    <AppButton
                      style={styles.cartButton}
                      shadow={false}
                      loading={addingToCart}
                      loadingColor={colors.blueLight}
                      onPress={handleSubmit}
                      textColor={colors.blueLight}
                      title="Add to Cart"
                    />
                  ) : (
                    <AppButton
                      style={styles.cartButton}
                      shadow={false}
                      loading={addingToCart}
                      loadingColor={colors.blueLight}
                      onPress={handleSubmit}
                      textColor={colors.blueLight}
                      title="Update"
                    />
                  )}
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        presentationStyle="overFullScreen"
        animationType="slide"
        visible={visible}
      >
        <View style={styles.login}>
          <LoginScreen closeModal={() => setVisible(false)} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  goBack: {
    alignSelf: "flex-end",
    right: 10,
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
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
  },
  inputFormHeader: {
    width: "100%",
    padding: 15,
    marginTop: 25,
    borderTopWidth: 35,
    borderTopColor: colors.creamy,
    borderRadius: 15,

    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowColor: "black",
    textAlign: "right",
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
    backgroundColor: colors.creamy,
  },
  buyButton: {
    width: "40%",
  },
});
