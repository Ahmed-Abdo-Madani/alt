import React from "react";
import { StyleSheet, FlatList, Image, ScrollView, View } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppText from "../components/AppText";
import GoBackButton from "../components/GoBackButton";
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
    title: "name holder with coffee",
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

const HomeScreen = () => {
  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: colors.lightGray,
            }}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <AppText style={styles.text}>Cart 👋</AppText>
              <AppText style={[styles.text, { fontSize: 27 }]}>
                To a World of gifts.🎁
              </AppText>
            </View>
            <GoBackButton style={styles.button} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.header}>
            <AppButton style={styles.button} title="pay now" />
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
    marginVertical: 10,
    width: "100%",
  },
  button: {
    position: "relative",
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
