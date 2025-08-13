import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import home from "./src/screen/Home";
import onescreen from "./src/screen/Onescreen";
import twoscreen from "./src/screen/Twoscreen";
import threescreen from "./src/screen/Threescreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="onescreen" component={onescreen} />
        <Stack.Screen name="twoscreen" component={twoscreen} />
        <Stack.Screen name="threescreen" component={threescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
