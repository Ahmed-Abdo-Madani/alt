import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors'
import InputField from './InputField'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from './AppButton';



const AppSearchBar = (onChangeText,loading,onPress) => {
    return (
        <View style={styles.container}>
           <MaterialCommunityIcons
            style={styles.icon}
            name="search"
            size={25}
            color={colors.darkGray}
          />
          <InputField
            style={styles.InputField}
            placeholder="Enter OTP ..."
            keyboardType="numeric"
            autoCorrect={false}
            onChangeText={onChangeText}
          />
          <AppButton
            style={styles.submitButton}
            shadow={false}
            loading={loading}
            onPress={onPress}
            bgColor={colors.blueLight}
            textColor={colors.white}
            title="Search"
          />
        </View>
    )
}

export default AppSearchBar

const styles = StyleSheet.create({
    submitButton:{

    },
    InputField:{

    },
    container:{
        flex:1,
        flexDirection:'row',
        padding:5,
        backgroundColor:colors.lightGray
    },
    icon:{

    }
})
