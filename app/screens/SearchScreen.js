import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";

const SearchScreen = ({ route }) => {
  const getHomeScreenItems = useSelector((state) => state.getHomeScreenItems);
  const { loading, error, items } = getHomeScreenItems;

  const navigation = useNavigation();
  const searchText = route.params;
  const filterd_items = items.filter((item) =>
    item.data.name.includes(searchText)
  );

  return (
    <Screen>
      {filterd_items.length !== 0 ? (
        <FlatList
          data={filterd_items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              feed
              id={item.id}
              title={item.data.name}
              subtitle={item.data.price}
              image={item.data.imageURL}
              onPress={() => navigation.navigate("itemDetails", item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptySearchContainer}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="layers-search"
            size={150}
            color={colors.creamyDark}
          />
          <AppText style={styles.text}>لا يوجد شئ.</AppText>
          <AppText style={styles.text}>أكتب شئ أخر.</AppText>
        </View>
      )}
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  emptySearchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginVertical: 20,
  },
  text: {
    marginVertical: 5,
    fontSize: 18,
    color: colors.lightGray,
  },
});
