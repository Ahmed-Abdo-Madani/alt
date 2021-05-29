import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

import logger from "../utility/logger";

const prefix = "cache";
const timeLimit = 29;

const store = async (key, value) => {
  const item = { value, timeStamp: Date.now() };
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    logger.log("Error in storing Async_Storage :" + error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const itemTimeStamp = dayjs(item.timeStamp);
  return now.diff(itemTimeStamp, "day") > timeLimit;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    logger.log("Error in getting Async_Storage :" + error);
  }
};
const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
  } catch (error) {
    logger.log("cache layer remove item :" + error);
  }
};

export default {
  store,
  get,
  remove,
};
