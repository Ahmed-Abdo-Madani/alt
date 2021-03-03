import React from "react";
import { StyleSheet, FlatList, Image, ScrollView, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

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

const HomeScreen = () => {
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
              <AppText style={styles.text}>Feed 🎏</AppText>
              <AppText style={[styles.text, { fontSize: 27 }]}>
                Get new stuff here.🌟
              </AppText>
            </View>
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        renderItem={({ item }) => (
          <Card
            feed
            title={item.title}
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
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginVertical: 10,
    width: "100%",
  },
  button: {
    width: "auto",
    height: 50,
    marginTop: 10,
    paddingHorizontal: 15,
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
