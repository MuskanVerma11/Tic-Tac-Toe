import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Start from './Screens/Start';
import GameBoard from './Screens/GameBoard';
import ResultBoard from './Screens/ResultHistory';

const Stack=createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='Start Screen' component={Start}/>
            <Stack.Screen name='Game Board' component={GameBoard}/>
            <Stack.Screen name='Result' component={ResultBoard}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}