import React from 'react'
import { FlatList, StyleSheet} from 'react-native'

// import categories from '../constants/categories'
import ListItem from './ListItem'

const CategoryList = () => {
   
   const categories = [
       {name :'office',  id: 1},
       {name :'gifts',  id: 2},
       {name :'home',  id: 3},
       {name :'luxury',  id: 4},
       {name :'cheap',  id:5},
       {name :'empty',  id: 6},

   ]
    return (
       <FlatList
       bounces={false}
       horizontal
       style={{}}
       showsHorizontalScrollIndicator={false}
       data={categories}
       keyExtractor={(item) => item.id.toString()}
       renderItem={({item}) =>
        
           (<ListItem style={{width:150}} profileItem iconName='plus'  onPress={() => console.log(item)} title={item.name}/>)
       }
       
       />

    )
}

export default CategoryList

const styles = StyleSheet.create({})
