import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
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
    title: "golden sword",
    subtitle: "$10",
    image: require("../assets/test3.jpeg"),
  },
  {
    id: 3,
    title: "dignified warrior set",
    subtitle: "$999",
    image: require("../assets/test4.jpeg"),
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <AppText style={styles.text}>Welcome 👋</AppText>
              <AppText style={[styles.text, { fontSize: 27 }]}>
                To a World of gifts.🎁
              </AppText>
            </View>
            <View style={styles.headerIconCintainer}>
              <AppIcon
                style={styles.headerIcon}
                name="cart"
                onPress={() => navigation.navigate("cart")}
              />
              <AppIcon
                style={styles.headerIcon}
                name="apps"
                onPress={() => console.log("🎊")}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.header}>
            <AppText style={styles.text}>Thank u 😊</AppText>
            <AppText style={[styles.text, { fontSize: 27 }]}>
              We hope u come back 🙌
            </AppText>
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        renderItem={({ item }) => (
          <Card
            home
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={() => navigation.navigate("itemDetails")}
          />
        )}
      />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    width: "100%",
  },
  headerIconCintainer: {
    flexDirection: "row",
  },
  headerIcon: {
    margin: 5,
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
