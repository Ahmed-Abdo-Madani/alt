import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
} from "react-native";

import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subtitle, image, feed = false, home = false }) => {
  const [visible, setVisible] = useState(false);

  return home ? (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.75}
        style={styles.container}
      >
        <Image style={styles.image} source={image} />
        <View style={styles.textContainer}>
          <AppText>{title}</AppText>
          <AppText>{subtitle}</AppText>
        </View>
      </TouchableOpacity>
      <Modal
        presentationStyle="fullScreen"
        animationType="slide"
        visible={visible}
      >
        <ItemDetailsScreen
          item={{ title, subtitle, image }}
          closeModal={() => setVisible(false)}
        />
      </Modal>
    </>
  ) : (
    feed && (
      <>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          activeOpacity={0.75}
          style={styles.feedContainer}
        >
          <ImageBackground style={styles.feedImage} source={image} />
          <View style={styles.feedTextContainer}>
            <AppText style={styles.feedText}>{title}</AppText>
            <AppText style={styles.feedText}>{subtitle}</AppText>
          </View>
        </TouchableOpacity>
        <Modal
          transparent={true}
          presentationStyle="overFullScreen"
          animationType="slide"
          visible={visible}
        >
          <ItemDetailsScreen
            item={{ title, subtitle, image }}
            closeModal={() => setVisible(false)}
          />
        </Modal>
      </>
    )
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: colors.white,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowColor: "black",
  },
  image: {
    height: 200,
    width: "100%",
  },
  textContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  feedContainer: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.white,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowColor: "black",
  },
  feedImage: {
    height: 300,
    width: "100%",
  },
  feedTextContainer: {
    width: "100%",
    position: "absolute",
    backgroundColor: colors.black,
    opacity: 0.8,
    bottom: 0,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  feedText: {
    fontSize: 21,
    color: colors.white,
  },
});
