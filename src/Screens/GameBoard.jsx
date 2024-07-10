import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { primary } from '../Colors'
import { useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function GameBoard({navigation}) {
    const route=useRoute();
    const player1=route?route?.params.player1:"Player 1";
    const player2=route?route?.params.player2:"Player 2";
    const [turn, setTurn]=useState('X');
    const cross=require('../assets/X.png');
    const circle=require('../assets/O.png');
    const [mark, setMark]=useState([
        null, null, null,
        null, null, null,
        null, null, null
    ]);

    const markBox=(position)=>{
        if(!mark[position] && (turn==='O' || turn==='X')){
            let temp=[...mark];
            temp[position]=turn;
            setMark(temp);
            console.log(mark);
            if(turn==='X'){
                setTurn('O');
            }else{
                setTurn('X');
            }
        }
    }

    const restart=()=>{
        setMark([
            null,null,null,
            null,null,null,
            null,null,null
        ]);
        setTurn('X');
    }

    const [index,setIndex]=useState(1);
    const saveResult=()=>{
        if(turn!=='X' && turn!=='O'){
            const key=`${index}`;
            const value={
                player1:player1.trim(),
                player2:player2.trim(),
                winner:`${turn.replace(" Won The Game!","").trim()}`
            };
            storeData(key,JSON.stringify(value));
            setIndex(index+1);
            navigation.navigate('Result');
        }
    }

    const storeData=async(key,value)=>{
        try{
            await AsyncStorage.setItem(key,value);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        // O O O Winner 1st row
        if(mark[0]===mark[1] && mark[1]===mark[2] && mark[0]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 1st row
        else if(mark[0]===mark[1] && mark[1]===mark[2] && mark[0]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O Winner 2nd row
        else if(mark[3]===mark[4] && mark[4]===mark[5] && mark[3]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 2nd row
        else if(mark[3]===mark[4] && mark[4]===mark[5] && mark[3]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O Winner 3rd row
        else if(mark[6]===mark[7] && mark[7]===mark[8] && mark[6]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 3rd row
        else if(mark[6]===mark[7] && mark[7]===mark[8] && mark[6]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O Winner 1st col
        else if(mark[0]===mark[3] && mark[3]===mark[6] && mark[0]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 1st col
        else if(mark[0]===mark[3] && mark[3]===mark[6] && mark[0]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O Winner 2nd col
        else if(mark[1]===mark[4] && mark[4]===mark[7] && mark[1]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 2nd col
        else if(mark[1]===mark[4] && mark[4]===mark[7] && mark[1]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O Winner 3rd col
        else if(mark[2]===mark[5] && mark[5]===mark[8] && mark[2]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X Winner 3rd col
        else if(mark[2]===mark[5] && mark[5]===mark[8] && mark[2]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O main diagonal 
        else if(mark[0]===mark[4] && mark[4]===mark[8] && mark[0]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X main diagonal
        else if(mark[0]===mark[4] && mark[4]===mark[8] && mark[0]==='X'){
            setTurn(player1+" Won The Game!");
        }
        // O O O second diagonal 
        else if(mark[2]===mark[4] && mark[4]===mark[6] && mark[2]==='O'){
            setTurn(player2+" Won The Game!");
        }
        // X X X second diagonal
        else if(mark[2]===mark[4] && mark[4]===mark[6] && mark[2]==='X'){
            setTurn(player1+" Won The Game!");
        }
        else if(mark[0]!==null && mark[1]!==null && mark[2]!==null &&
            mark[3]!==null && mark[4]!==null && mark[5]!==null &&
            mark[6]!==null && mark[7]!==null && mark[8]!==null && (turn==='X' || turn==='O')
        ){
            setTurn("Match Draw");
        }
    },[mark]);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={{position:"absolute", right:160}} onPress={()=>navigation.goBack()}>
                <Ionicons name='arrow-back' size={24} color="black"/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Tic Tac Toe</Text>
        </View>
      <View style={{justifyContent:"space-between", flexDirection:"row", width:"100%", marginTop:50}}>
      <View style={{alignItems:"center"}}>
      <Text style={styles.label}>Player 1 - X</Text>
      <Text style={styles.name}>{player1}</Text>
      </View>
      <View style={{alignItems:"center"}}>
      <Text style={styles.label}>Player 2 - O</Text>
      <Text style={styles.name}>{player2}</Text>
      </View>
      </View>
      <View style={styles.GameBoard}>
        <View style={{flexDirection:"row"}}>
            <Pressable onPress={()=>markBox(0)} style={[styles.box,{borderLeftWidth:0, borderTopWidth:0}]}>
                {mark[0]==='O' &&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[0]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>
    
            <Pressable style={[styles.box,{borderTopWidth:0}]} onPress={()=>markBox(1)}>
                {mark[1]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[1]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>

        
            <Pressable onPress={()=>markBox(2)} style={[styles.box, {borderTopWidth:0, borderRightWidth:0}]}>
                {mark[2]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[2]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>

        </View>
        <View style={{flexDirection:"row"}}>

            <Pressable style={[styles.box,{borderLeftWidth:0}]} onPress={()=>markBox(3)}>
                {mark[3]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[3]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>
        
            <Pressable style={styles.box} onPress={()=>markBox(4)}>
                {mark[4]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[4]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>
        
            <Pressable style={[styles.box,{borderRightWidth:0}]} onPress={()=>markBox(5)}>
                {mark[5]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[5]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>

        </View>
        <View style={{flexDirection:"row"}}>

            <Pressable style={[styles.box,{borderLeftWidth:0, borderBottomWidth:0}]} onPress={()=>markBox(6)}>
                {mark[6]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[6]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>

            <Pressable style={[styles.box, {borderBottomWidth:0}]} onPress={()=>markBox(7)}>
                {mark[7]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[7]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>
        
            <Pressable style={[styles.box,{borderRightWidth:0, borderBottomWidth:0}]} onPress={()=>markBox(8)}>
                {mark[8]==='O'&&(
                    <Image source={circle} style={styles.mark}/>
                )}
                {mark[8]==='X'&&(
                    <Image source={cross} style={styles.mark}/>
                )}
            </Pressable>
        
        </View>
      </View>
      <View>
        <View style={[styles.playerTurn,{backgroundColor:turn==='X'?"#FF615E": turn==='O'?"#3EC5F4":"#F4D58D"}]}>
            {turn==='O' || turn==='X'?(
                <Text style={styles.turnText}>{turn} 's Turn</Text>
            ):(
                <Text style={styles.turnText}>{turn}</Text>
            )}
        </View>
      </View>

      <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%", marginTop:30}}>
      <TouchableOpacity style={styles.btn} onPress={restart}>
        <Text style={styles.btnText}>Restart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={saveResult}>
        <Text style={styles.btnText}>Save Result</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:primary,
        flex:1,
        paddingHorizontal:25,
        alignItems:"center",
    },
    label:{
        fontSize:10,
        color:"white"
    },
    name:{
        color:"white",
        fontSize:18
    },
    GameBoard:{
        marginTop:60,
        height:wp(90),
        width:wp(90),
        marginBottom:60
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
    box:{
        width:wp(30),
        height:wp(30),
        borderWidth:3,
        borderColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    mark:{
        width:80,
        height:80
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:30,
        backgroundColor:"white",
        borderRadius:50,
        marginVertical:20
    },
    btnText:{
        color:"black",
        fontSize:16,
    },
    playerTurn:{
        backgroundColor:"#3EC5F4",
        width:wp(90),
        paddingHorizontal:10,
        paddingVertical:12,
        alignItems:"center"
    },
    turnText:{
        fontSize:18,
        color:"black",
        fontWeight:"bold",
        letterSpacing:1,
        fontFamily:"serif"
    }
})