import React from "react";
import { StyleSheet, FlatList, Image, ScrollView, View } from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppIcon from "../components/AppIcon";

const lists = [
  {
    id: 1,
    title: "name holder with coffee",
    subtitle: "$55",
    image: require("../assets/test1.jpeg"),
  },
  {
    id: 2,
    title: "da golden sword of atherah , with name ingraving in the blade",
    subtitle: "$55",
    image: require("../assets/test3.jpeg"),
  },
  {
    id: 3,
    title: "name holder with coffee",
    subtitle: "$55",
    image: require("../assets/test4.jpeg"),
  },
];

const HomeScreen = ({ closeModal, style }) => {
  return (
    <View style={[styles.container, style]}>
      <AppIcon
        style={styles.closeButton}
        onPress={closeModal}
        name="close"
        iconColor={colors.darkGray}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: colors.creamy,
            }}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <AppText style={styles.text}>Cart 🛒</AppText>
              <AppText style={[styles.text, { fontSize: 17 }]}>
                We take Care of your gifts.🎁
              </AppText>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.header}>
            <AppButton style={styles.payButton} title="pay now" />
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: "80%",
    height: "90%",
    backgroundColor: colors.white,
  },
  flatList: { zIndex: -1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    zIndex: 1,
    top: 10,
    right: 10,
    position: "absolute",
  },
  payButton: {
    marginTop: 15,
  },
  text: {
    color: colors.darkGray,
    fontSize: 45,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
