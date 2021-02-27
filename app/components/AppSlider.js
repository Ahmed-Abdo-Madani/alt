import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import AppText from './AppText';
import Card from './Card';

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

const AppSlider = () => {
    return (
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <AppText style={styles.text}>Welcome 👋</AppText>
            <AppText style={[styles.text, { fontSize: 27 }]}>
              To a World of gifts.🎁
            </AppText>
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
    )
}

export default AppSlider

const styles = StyleSheet.create({})
