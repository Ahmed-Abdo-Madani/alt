import {
  CALC_RATE_FAIL,
  CALC_RATE_REQUSET,
  CALC_RATE_SUCCESS,
  CREATE_SHIPMENT_REQUSET,
  CREATE_SHIPMENT_FAIL,
  CREATE_SHIPMENT_SUCCESS,
  CREATE_PICKUP_FAIL,
  CREATE_PICKUP_REQUSET,
  CREATE_PICKUP_SUCCESS,
  PRINT_LABEL_FAIL,
  PRINT_LABEL_SUCCESS,
  PRINT_LABEL_REQUSET,
} from "../constants/ShippingConstants";
import axios from "axios";

import logger from "../utility/logger";

const ClientInfo = {
  UserName: "reem@reem.com",
  Password: "123456789",
  Version: "v1.0",
  AccountNumber: "4004636",
  AccountPin: "432432",
  AccountEntity: "RUH",
  AccountCountryCode: "SA",
  Source: 24,
};
const Transaction = null;
const ShipmentDetails = {
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
};
const Shipment = {
  Shipper: "watashi des",
  Consignee: "also watashi",
  ShippingDateTime: new Date().toDateString(),
  Details: ShipmentDetails,
};
const Shipments = [Shipment];
const LabelInfo = { ReportID: 150, ReportType: "URL" };
const request_Template = {
  ClientInfo,
  Transaction,
  ShipmentDetails,
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

  PreferredCurrencyCode: "SAR",
};

const base_url =
  "https://ws.dev.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json";

export const calc_Rate = (request_data) => async (dispatch, getState) => {
  const {
    ClientInfo,
    DestinationAddress,
    OriginAddress,
    PreferredCurrencyCode,
    ShipmentDetails,
    Transaction,
  } = request_Template;
  try {
    dispatch({ type: CALC_RATE_REQUSET });
    /* const {
      userLogin: { userInfo },
    } = getState(); */
    const config = {
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${base_url}/CalculateRate`,
      {
        ClientInfo,
        DestinationAddress,
        OriginAddress,
        PreferredCurrencyCode,
        ShipmentDetails,
        Transaction,
      },
      config
    );
    dispatch({ type: CALC_RATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CALC_RATE_FAIL,
      payload: `Aramex Calculate Rate Api Error : ${error}`,
    });
    logger.log(error);
  }
};

export const shipment_Creation_Request = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_SHIPMENT_REQUSET });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "https://ws.dev.aramex.net/shippingapi.v2/shipping/service_1_0.svc/json/CreateShipments",
      {
        ClientInfo,
        Transaction,
        Shipments,
        LabelInfo,
      },
      config
    );
    dispatch({ type: CREATE_SHIPMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SHIPMENT_FAIL,
      payload: `Aramex Shipment Creation Request Api Error : ${error}`,
    });
    logger.log(error);
  }
};

export const pickup_Creation_Request =
  (request_data) => async (dispatch, getState) => {
    dispatch({ type: CREATE_PICKUP_REQUSET });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${base_url}/PickupCreationRequest`,
        request_data,
        config
      );
      dispatch({ type: CREATE_PICKUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_PICKUP_FAIL,
        payload: `Aramex CREATE PICKUP Request Api Error : ${error}`,
      });
      logger.log(error);
    }
  };

export const print_Label_Request =
  (request_data) => async (dispatch, getState) => {
    dispatch({ type: PRINT_LABEL_REQUSET });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${base_url}/LabelPrintingRequest`,
        request_data,
        config
      );
      dispatch({ type: PRINT_LABEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRINT_LABEL_FAIL,
        payload: `Aramex PRINT_LABEL Request Api Error : ${error}`,
      });
      logger.log(error);
    }
  };
