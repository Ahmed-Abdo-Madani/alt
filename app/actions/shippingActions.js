import {
  CALC_RATE_FAIL,
  CALC_RATE_REQUSET,
  CALC_RATE_SUCCESS,
} from "../constants/ShippingConstants";
import axios from "axios";

const base_url =
  "https://ws.dev.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json";
export const calc_Rate = (request_data) => async (dispatch, getState) => {
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
      request_data,
      config
    );
    dispatch({ type: CALC_RATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CALC_RATE_FAIL,
      payload: `Aramex Calculate Rate Api Error : ${error}`,
    });
  }
};
