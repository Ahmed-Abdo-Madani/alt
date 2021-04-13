import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/core";

const CategoryScreen = ({ route }) => {
  const getHomeScreenItems = useSelector((state) => state.getHomeScreenItems);
  const { loading, error, items } = getHomeScreenItems;

  const navigation = useNavigation();
  const category = route.params;

  return (
    <Screen>
      <FlatList
        data={items.filter((item) => item.data.category === category)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            home
            id={item.id}
            title={item.data.name}
            subtitle={item.data.price}
            image={item.data.imageURL}
            onPress={() => navigation.navigate("itemDetails", item)}
          />
        )}
      />
    </Screen>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
