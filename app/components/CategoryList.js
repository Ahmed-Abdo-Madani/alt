import React from 'react'
import { FlatList, StyleSheet} from 'react-native'
import CategoryItem from './CategoryItem'

import categories from '../constants/categories'


const CategoryList = () => {
   
    return (
       <FlatList
       horizontal
       showsHorizontalScrollIndicator={false}
       data={categories}
       keyExtractor={(item) => item.id.toString()}
       renderItem={({item}) =>
           (<CategoryItem   icon={item.icon} title={item.name}/>)
       }
       
       />

    )
}

export default CategoryList

const styles = StyleSheet.create({})
