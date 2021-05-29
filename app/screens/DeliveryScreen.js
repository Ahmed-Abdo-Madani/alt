import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  calc_Rate,
  shipment_Creation_Request,
} from "../actions/shippingActions";

import logger from "../utility/logger";

import AppButton from "../components/AppButton";
import colors from "../config/colors";

// TEST_API_URL: "https://ws.dev.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate"

const request_Template = {
  ClientInfo: {
    UserName: "reem@reem.com",
    Password: "123456789",
    Version: "v1.0",
    AccountNumber: "4004636",
    AccountPin: "432432",
    AccountEntity: "RUH",
    AccountCountryCode: "SA",
    Source: 24,
  },
  OriginAddress: {
    Line1: null,
    Line2: null,
    Line3: null,
    City: "Hafar al batin",
    StateOrProvinceCode: "",
    PostCode: "31991",
    CountryCode: "SA",
    Longitude: 0.0,
    Latitude: 0.0,
    BuildingNumber: null,
    BuildingName: null,
    Floor: null,
    Apartment: null,
    POBox: null,
    Description: null,
  },
  DestinationAddress: {
    Line1: null,
    Line2: null,
    Line3: null,
    City: "Riyadh",
    StateOrProvinceCode: "",
    PostCode: "22334",
    CountryCode: "SA",
    Longitude: 0.0,
    Latitude: 0.0,
    BuildingNumber: null,
    BuildingName: null,
    Floor: null,
    Apartment: null,
    POBox: null,
    Description: null,
  },
  ShipmentDetails: {
    Dimensions: null,
    ActualWeight: {
      Unit: "kg",
      Value: 5.0,
    },
    ChargeableWeight: {
      Unit: "kg",
      Value: 5.0,
    },
    DescriptionOfGoods: null,
    GoodsOriginCountry: null,
    NumberOfPieces: 1,
    ProductGroup: "DOM",
    ProductType: "ONP",
    PaymentType: "P",
    PaymentOptions: null,
    CustomsValueAmount: null,
    CashOnDeliveryAmount: null,
    InsuranceAmount: null,
    CashAdditionalAmount: null,
    CashAdditionalAmountDescription: null,
    CollectAmount: null,
    Services: "",
    Items: null,
    DeliveryInstructions: null,
    AdditionalProperties: null,
    ContainsDangerousGoods: false,
  },
  PreferredCurrencyCode: "SAR",
  Transaction: null,
};

const DeliveryScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, shippingCost, createShipmentResponse } = useSelector(
    (state) => state.shipping
  );
  const deliveryHandler = async () => {
    dispatch(shipment_Creation_Request());
    if (error) logger.log(error);
  };
  return (
    <View style={styles.container}>
      <AppButton
        loading={loading}
        onPress={() => deliveryHandler()}
        title="Track"
      />
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.creamy,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
