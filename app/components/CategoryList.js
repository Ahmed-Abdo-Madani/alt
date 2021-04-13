import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";

import categories from "../constants/categories";
import { useNavigation } from "@react-navigation/core";

const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CategoryItem
          onPress={() => navigation.navigate("category", item.name)}
          icon={item.icon}
          title={item.name}
        />
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
