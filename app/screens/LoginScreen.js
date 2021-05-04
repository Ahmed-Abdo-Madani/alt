import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import CountDown from "react-native-countdown-component";

import InputField from "../components/InputField";
import AppIcon from "../components/AppIcon";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import AppText from "../components/AppText";

const LoginScreen = ({ closeModal, style, inModal = true }) => {
  const dispatch = useDispatch();
  const { pushToken } = useSelector((state) => state.notifications);
  const recaptchaVerifierRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState();
  const [buttonPressed, setbuttonPressed] = useState(false);
  const [waitForSend, setWaitForSend] = useState(true);
  const [userName, setuserName] = useState();
  const [registered, setregistered] = useState(false);
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [OTPError, setOTPError] = useState(false);

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  const attemptInvisibleVerification = true;

  const resendOTP = () => {
    setWaitForSend(true);
    verifiePhoneNumber();
  };

  const verifiePhoneNumber = async () => {
    setbuttonPressed(true);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      await phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
        .then((sentVerificationId) => {
          setVerificationId(sentVerificationId);
          setregistered(true);
          setbuttonPressed(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserToFireStore = async ({ uid }) => {
    try {
      await firebase.firestore().collection("users").doc(phoneNumber).set({
        userName,
        phoneNumber,
        uid,
        pushToken: pushToken.data,
        createdAt: new Date().toDateString(),
      });
    } catch (error) {
      console.log("save user to Firestore error : " + error);
    }
  };

  const signInWithCredential = async () => {
    setbuttonPressed(true);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          if (res.user) {
            dispatch(login({ userName, isAdmin: false, phoneNumber }));
            saveUserToFireStore(res.user);
          }
        });
    } catch (error) {
      console.log("signIn With Credential firebase error : " + error);
      setOTPError(true);
      setbuttonPressed(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {inModal && (
        <AppIcon
          style={styles.closeButton}
          onPress={closeModal}
          name="close"
          iconColor={colors.darkGray}
        />
      )}

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        attemptInvisibleVerification={attemptInvisibleVerification}
        firebaseConfig={firebaseConfig}
      />

      {registered ? (
        <>
          <MaterialCommunityIcons
            style={[styles.icon, { marginTop: inModal ? 0 : 45 }]}
            name="cellphone-key"
            size={105}
            color={colors.green}
          />
          <AppText style={styles.title}>تأكيد رقم الهاتف</AppText>
          <InputField
            style={styles.InputField}
            placeholder="أدخل الرمز المرسل ..."
            keyboardType="numeric"
            autoCorrect={false}
            onChangeText={(text) => {
              setVerificationCode(text);
            }}
          />
          {OTPError && (
            <AppText style={styles.errorOTP}>الرمز المدخل غير صحيح</AppText>
          )}
          <AppText numberOfLines={2} style={styles.verificationInfo}>
            {`تم إرسال رمز سري للرقم  ${phoneNumber}`}
          </AppText>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: 15,
            }}
          >
            {waitForSend ? (
              <View style={styles.verificationInfoContainer}>
                <AppText style={styles.verificationInfo}>
                  ارسل رمز جديد في خلال . . .
                </AppText>
                <CountDown
                  style={{}}
                  until={59}
                  size={14}
                  onFinish={() => setWaitForSend(false)}
                  timeToShow={["S"]}
                  digitStyle={{ backgroundColor: colors.creamyDarkTrans }}
                  timeLabels={{}}
                />
              </View>
            ) : (
              <AppButton
                style={{ width: "auto" }}
                shadow={false}
                onPress={resendOTP}
                bgColor={colors.white}
                textColor={colors.blueLight}
                title="أعد إرسال الرمز"
              />
            )}
          </View>
          <AppButton
            style={styles.submitButton}
            shadow={false}
            loading={buttonPressed}
            onPress={signInWithCredential}
            bgColor={colors.green}
            textColor={colors.white}
            title="التأكيد"
          />
        </>
      ) : (
        <>
          <MaterialCommunityIcons
            style={[styles.icon, { marginTop: inModal ? 0 : 45 }]}
            name="card-account-phone"
            size={105}
            color={colors.blueLight}
          />
          <AppText style={styles.title}>التسجيل</AppText>
          <View style={styles.inputContainer}>
            <View style={styles.fieldContainer}>
              <MaterialCommunityIcons
                style={{ marginVertical: 5, marginHorizontal: 5 }}
                name="account"
                size={29}
                color={colors.creamyDark}
              />

              <InputField
                style={styles.inputPhoneNo}
                placeholder="إسم المستخدم ..."
                autoCorrect={false}
                onChangeText={(text) => setuserName(text)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <MaterialCommunityIcons
                style={{ marginVertical: 5, marginHorizontal: 5 }}
                name="phone"
                size={29}
                color={colors.creamyDark}
              />
              <InputField
                children={
                  <AppText
                    style={{
                      fontSize: 15,
                      fontWeight: "normal",
                      color: colors.softGray,
                    }}
                  >
                    +966 |{" "}
                  </AppText>
                }
                style={styles.inputPhoneNo}
                placeholder="رقم الهاتف ..."
                keyboardType="phone-pad"
                autoCorrect={false}
                onChangeText={(text) => setPhoneNumber("+966" + text)}
              />
            </View>
          </View>
          <AppButton
            style={styles.submitButton}
            shadow={false}
            loading={buttonPressed}
            disabled={!phoneNumber}
            onPress={verifiePhoneNumber}
            title="تسجيل الدخول"
          />
        </>
      )}
      {attemptInvisibleVerification && (
        <FirebaseRecaptchaBanner style={styles.banner} />
      )}
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
    alignSelf: "center",
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  fieldContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  InputField: {
    flex: 1,
    marginVertical: 10,
  },
  inputPhoneNo: {
    flex: 1,
  },
  submitButton: {
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    marginBottom: 5,
    color: colors.creamyDark,
    alignSelf: "center",
    fontSize: 35,
  },
  errorOTP: {
    color: colors.red,
  },
  verificationInfo: {
    marginTop: 25,
    color: colors.softGray,
    textAlign: "center",
    fontSize: 16,
  },
  verificationInfoContainer: {
    justifyContent: "center",
  },
  banner: {
    marginTop: 15,
  },
});
