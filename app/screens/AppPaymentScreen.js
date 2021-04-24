import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import InputField from "../components/InputField";

const validationSchema = Yup.object().shape({
  cardNo: Yup.number().required().max(16).label("CardNo"),
  ExpiryYear: Yup.number().required().max(2).label("ExpYear"),
  ExpiryMonth: Yup.number().required().max(2).label("ExpMonth"),
  holderName: Yup.string().required().max(35).label("HolderName"),
  ccv: Yup.number().required().max(3).label("CCV"),
});

const AppPaymentScreen = () => {
  return (
    <View>
      <Formik
        initialValues={{
          cardNo: "",
          ccv: "",
          holderName: "",
          ExpiryYear: "",
          ExpiryMonth: "",
        }}
        onSubmit={(values) => handleAddToCart(values)}
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
              loading={addingToCart}
              loadingColor={colors.blueLight}
              onPress={handleSubmit}
              textColor={colors.blueLight}
              title="Add to Cart"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AppPaymentScreen;

const styles = StyleSheet.create({});
