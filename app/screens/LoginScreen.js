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

const LoginScreen = ({ closeModal, style,afterSignIn }) => {
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
        verificationId,verificationCode
      );

      await firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) =>{ if(res.user) {console.log(res.user)
           dispatch(login(res.user))}
        });
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
        <View style={styles.inputContainer}>
    
          <InputField
            style={styles.InputField}
            placeholder="phone number ..."
            keyboardType="phone-pad"
            autoCorrect={false}
            onChangeText={(text) => setPhoneNumber("+966"+text)}
          /></View>
          <AppButton
            style={styles.submitButton}
            shadow={false}
            disabled={!phoneNumber}
            onPress={handlePhoneAuth}
            title="sign up"
          />
          <AppButton
            style={styles.submitButton}
            shadow={false}
            disabled={!phoneNumber}
            onPress={handlePhoneAuth}
            bgColor={colors.creamy}
            textColor={colors.blueLight}
            title="login"
          />
        </>
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner style={styles.banner} />}
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
    alignSelf:'center'
  },
  inputContainer:{
    marginBottom: 15,

  },
  InputField: {
  },
  submitButton: {
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  icon: {
    alignSelf: "center",
    marginBottom:45
  },
  banner:{
    marginTop:15
  }
});
