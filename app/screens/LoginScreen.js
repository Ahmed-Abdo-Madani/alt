import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";

import InputField from "../components/InputField";
import AppIcon from "../components/AppIcon";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const LoginScreen = ({ closeModal, style }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const recaptchaVerifierRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  const attemptInvisibleVerification = true;

  /*   const handlePhoneAuth = () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        getState().userLogin.verificationId,
        verificationCode
        );
        dispatch(loginVerification(verificationCode));
    } catch (error) {
      
    }

  };
  const signInWithPhoneNumber = () => {
    dispatch(login(phoneNumber, recaptchaVerifierRef));
  }; */

  const handlePhoneAuth = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
        .then((sentVerificationId) => setVerificationId(sentVerificationId))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      await firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => res.user && dispatch(login(res.user)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />

      <MaterialCommunityIcons
        style={styles.icon}
        name="cellphone-iphone"
        size={105}
        color={colors.blueDark}
      />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        attemptInvisibleVerification={attemptInvisibleVerification}
        firebaseConfig={firebaseConfig}
      />

      {verificationId ? (
        <>
          <InputField
            style={styles.InputField}
            placeholder="Enter OTP ..."
            keyboardType="numeric"
            autoCorrect={false}
            onChangeText={(text) => {
              setVerificationCode(text);
            }}
          />
          <AppButton
            style={styles.submitButton}
            shadow={false}
            onPress={handlePhoneVerification}
            bgColor={colors.green}
            textColor={colors.white}
            title="Verifie"
          />
        </>
      ) : (
        <>
          {/*  <InputField
            style={styles.InputField}
            placeholder="User name ..."
            autoCorrect={false}
            onChangeText={(text) => console.log(text)}
          />
          <InputField
            style={styles.InputField}
            placeholder="Email address ..."
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(text) => console.log(text)}
          /> */}
          <InputField
            style={styles.InputField}
            placeholder="phone number ..."
            keyboardType="phone-pad"
            autoCorrect={false}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <AppButton
            style={styles.submitButton}
            shadow={false}
            disabled={!phoneNumber}
            onPress={handlePhoneAuth}
            textColor={colors.white}
            title="sign up"
          />
        </>
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: "80%",
    height: "90%",
    padding: 25,
    backgroundColor: colors.white,
  },
  InputField: {
    marginVertical: 5,
  },
  submitButton: {
    marginVertical: 25,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  icon: {
    alignSelf: "center",
    marginVertical: 20,
  },
});
