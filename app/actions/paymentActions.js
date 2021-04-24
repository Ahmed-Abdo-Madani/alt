import {
  EXECUTE_REQUEST_JSON,
  INIT_PAYMENTS_FAIL,
  INIT_PAYMENTS_REQUEST,
  INIT_PAYMENTS_SUCCESS,
} from "../constants/paymentConstants";

import {
  MFPaymentRequest,
  MFCustomerAddress,
  MFExecutePaymentRequest,
  MFCardInfo,
  Response,
  MFSendPaymentRequest,
  MFLanguage,
  MFNotificationOption,
  MFPaymentype,
  MFMobileCountryCodeISO,
  MFCurrencyISO,
  MFPaymentStatusRequest,
  MFKeyType,
  MFInitiatePayment,
  MFSupplier,
} from "myfatoorah-reactnative";

//__________________________________________________________________________________________

export const init_Payment = (invoiceAmount) => async (dispatch) => {
  dispatch({ type: INIT_PAYMENTS_REQUEST });

  let initiateRequest = new MFInitiatePayment(
    invoiceAmount,
    MFCurrencyISO.SAUDIARABIA_SAR
  );
  MFPaymentRequest.sharedInstance.initiatePayment(
    initiateRequest,
    MFLanguage.ARABIC,
    (response) => {
      if (response.getError()) {
        dispatch({
          type: INIT_PAYMENTS_FAIL,
          payload: "Init_Payment_Error: " + response.getError().error,
        });
      } else {
        dispatch({
          type: INIT_PAYMENTS_SUCCESS,
          payload: response.getPaymentMethods(),
          invoiceValue: invoiceAmount,
        });
      }
    }
  );
};

//__________________________________________________________________________________________

export const execute_Request_Json = (selectedIndex) => async (
  dispatch,
  getState
) => {
  let request = new MFExecutePaymentRequest(
    parseFloat(getState().userPayment.invoiceValue),
    getState().userPayment.paymentMethods[selectedIndex].PaymentMethodId
  );
  request.customerEmail = "a@b.com"; // must be email
  request.customerMobile = "";
  request.customerCivilId = "";
  let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
  request.customerAddress = address;
  request.customerReference = "";
  request.language = "ar";
  request.mobileCountryCode = MFMobileCountryCodeISO.SAUDIARABIA;
  request.displayCurrencyIso = MFCurrencyISO.SAUDIARABIA_SAR;
  // request.supplierCode =
  // request.supplierValue =
  // var suppliers = []
  // var supplier = new MFSupplier(1, 1, parseFloat(invoiceValue))
  // suppliers.push(supplier)
  // request.suppliers = suppliers
  // var productList = []
  // var product = new MFProduct("ABC", 1.887, 1)
  // productList.push(product)
  // request.invoiceItems = productList
  dispatch({ type: EXECUTE_REQUEST_JSON, payload: request });
};

//__________________________________________________________________________________________
