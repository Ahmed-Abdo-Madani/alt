import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  execute_Direct_Payment,
  setCardInfo,
  execute_Request_Json,
  init_Payment,
} from "../actions/paymentActions";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  cardNo: Yup.number().required().label("CardNo"),
  ExpiryYear: Yup.number().required().label("ExpYear"),
  ExpiryMonth: Yup.number().required().label("ExpMonth"),
  holderName: Yup.string().required().label("HolderName"),
  ccv: Yup.number().required().label("CCV"),
});

const AppPaymentScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init_Payment(50));
    console.log("dispatched in appPayment");
  }, []);

  const handlePayment = (cardInfo) => {
    dispatch(execute_Request_Json(4));
    dispatch(
      setCardInfo({
        month: cardInfo.ExpiryMonth,
        year: cardInfo.ExpiryYear,
        cvv: cardInfo.ccv,
        cardNumber: cardInfo.cardNo,
        cardHolderName: cardInfo.holderName,
      })
    );
    dispatch(execute_Direct_Payment());
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          cardNo: "5123450000000008",
          ccv: "100",
          holderName: "Watashi des",
          ExpiryYear: "21",
          ExpiryMonth: "05",
        }}
        onSubmit={(values) => handlePayment(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
          <>
            <InputField
              column
              autoCorrect={false}
              onChangeText={handleChange("cardNo")}
              multiline={true}
              placeholder="Card No ..."
              onBlur={() => {
                setFieldTouched("cardNo");
              }}
              error={errors.cardNo}
              touched={touched.cardNo}
            />

            <View>
              <InputField
                column
                autoCorrect={false}
                onChangeText={handleChange("ExpiryYear")}
                multiline={true}
                placeholder="Exp Year ..."
                onBlur={() => {
                  setFieldTouched("ExpiryYear");
                }}
                error={errors.ExpiryYear}
                touched={touched.ExpiryYear}
              />
              <InputField
                column
                autoCorrect={false}
                onChangeText={handleChange("ExpiryMonth")}
                multiline={true}
                placeholder="Exp Month ..."
                onBlur={() => {
                  setFieldTouched("ExpiryMonth");
                }}
                error={errors.ExpiryMonth}
                touched={touched.ExpiryMonth}
              />
            </View>
            <InputField
              column
              autoCorrect={false}
              onChangeText={handleChange("holderName")}
              multiline={true}
              placeholder="Holder Name ..."
              onBlur={() => {
                setFieldTouched("holderName");
              }}
              error={errors.holderName}
              touched={touched.holderName}
            />
            <InputField
              column
              autoCorrect={false}
              onChangeText={handleChange("ccv")}
              multiline={true}
              placeholder="CCV..."
              onBlur={() => {
                setFieldTouched("ccv");
              }}
              error={errors.ccv}
              touched={touched.ccv}
            />

            <AppButton
              style={styles.cartButton}
              shadow={false}
              loading={false}
              loadingColor={colors.blueLight}
              onPress={handleSubmit}
              textColor={colors.blueLight}
              title="pay"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AppPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,

    backgroundColor: colors.white,
  },
});
