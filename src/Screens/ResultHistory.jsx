import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { primary } from '../Colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ResultHistory({navigation}) {
  const [result,setResult]=useState([]);
  const [clearResult,setClearResult]=useState(0);

  const getData=async()=>{
    try{
      const keys= await AsyncStorage.getAllKeys();
      const values=await AsyncStorage.multiGet(keys);
      const fetchedData=values.map(entry => {
        const jsonString = entry[1];
        return JSON.parse(jsonString);
      })
      setResult(fetchedData);
      console.log(fetchedData,"Fetched")
  }catch(error){
    console.log("Error fetching Results ", error);
  }
    // console.log(result); 
    // console.log(values);
  }

  const clear=async()=>{
    try{await AsyncStorage.clear();
    setClearResult(prevClearResult => prevClearResult + 1); // Trigger re-fetch by updating clearResult
    console.log(clearResult);
    setResult([]);
    console.log(result);
    }catch(error){
      console.log("Error clearing data ", error)
    }
  }

  useEffect(()=>{
    getData();
  },[clearResult]);

  useEffect(()=>{
    console.log(result);
  },[])
  
  const renderItem=({item})=>{
    const win=item.winner.split(' ');
    return(
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.player1} vs {item.player2}</Text>
        <Text style={styles.itemText}>{win[0]}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style={{position:"absolute", right:160}} onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={24} color="black"/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Result</Text>
      </View>
      <View style={[styles.item,{marginTop:30, marginBottom:24, backgroundColor:"#F4D58D"}]}>
        <Text style={[styles.itemText, {fontSize:20, fontWeight:"bold"}]}>Game</Text>
        <Text style={[styles.itemText, {fontSize:20, fontWeight:"bold"}]}>Winner</Text>
      </View>
      <FlatList
      data={result}
      renderItem={renderItem}
      keyExtractor={(item,index)=>index.toString()}
      showsVerticalScrollIndicator={false}
      />
      <View style={{width:"100%", alignItems:"flex-end"}}>
      <TouchableOpacity style={styles.btn} onPress={clear}>
        <MaterialIcons name='delete' size={32} color={primary}/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:primary,
    flex:1,
    paddingHorizontal:15,
    alignItems:"center",
  },
  header:{
    width:wp(100),
    backgroundColor:"white",
    paddingVertical:10,
    alignItems:"center"
},
headerText:{
    color:"black",
    fontFamily:"serif",
    fontSize:20,
    fontWeight:"bold",
    letterSpacing:1
},
item:{
  flexDirection:"row",
  marginBottom:8,
  justifyContent:"space-between",
  width:"100%",
  backgroundColor:"white",
  paddingVertical:8,
  paddingHorizontal:16,
  borderRadius:20
},
itemText:{
  color:"black",
  fontWeight:"600",
  fontSize:16,
  fontStyle:"italic",
  letterSpacing:0.01
},
btn:{
  backgroundColor:"#F4D58D",
  padding:12,
  borderRadius:100,
  marginBottom:30,
  zIndex:3,
  marginRight:10
}
})