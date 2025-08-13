import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Home from '../screen/Home';
import One from '../screen/Onescreen';
import Twoscreen from '../screen/Twoscreen';
import Threescreen from '../screen/Threescreen';


const Stack = createStackNavigator();

  export default function Appnavigation() {
  return (
       <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="onescreen" component={One} />
        <Stack.Screen name="twoscreen" component={Twoscreen} />
        <Stack.Screen name="threescreen" component={Threescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

 