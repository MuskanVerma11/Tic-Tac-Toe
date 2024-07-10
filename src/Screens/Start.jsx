import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { primary } from '../Colors'

export default function Start({navigation}) {
    img=require('../assets/splash.png');
    const [player1,setPlayer1]=useState('');
    const [player2, setPlayer2]=useState('');

    const startGame=()=>{
        navigation.navigate('Game Board',{player1:player1===""?"Player 1":player1, player2:player2===""?"Player 2":player2});
        setPlayer1('');
        setPlayer2('');
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={img} style={styles.img}/>
      <Text style={styles.heading}>Tic Tac Toe</Text>
      <View style={{width:"100%", alignItems:"center", paddingHorizontal:40, marginVertical:30}}>
      <Text style={styles.label}>Player 1</Text>
      <TextInput placeholder='Enter Name of Player 1' style={styles.input} value={player1} onChangeText={value=>setPlayer1(value)}/>
      <Text style={styles.label}>Player 2</Text>
      <TextInput placeholder='Enter Name of Player 2' style={styles.input} value={player2} onChangeText={value=>setPlayer2(value)}/>
      </View>
      <TouchableOpacity style={styles.btn} onPress={startGame}>
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:primary,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:50
    },
    img:{
        height:200,
        width:200,
        borderRadius:200,
        elevation:50,
        borderWidth:3,
        borderColor:"white"
    },
    heading:{
        marginVertical:20,
        fontSize:32,
        fontFamily:"serif",
        fontStyle:"italic",
        fontWeight:"800",
        color:"white"
    },
    label:{
        alignSelf:"flex-start",
        marginBottom:10,
        color:"white",
        fontSize:18
    },
    input:{
        alignSelf:"flex-start",
        borderWidth:1,
        borderColor:"white",
        borderRadius:10,
        marginBottom:15,
        paddingHorizontal:20,
        paddingVertical:8,
        fontSize:14,
        color:"white",
        width:"100%"
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:40,
        backgroundColor:"white",
        borderRadius:50,
        marginVertical:20
    },
    btnText:{
        color:"black",
        fontSize:16,
    }
})