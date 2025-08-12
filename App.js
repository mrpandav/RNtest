import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import home from "./src/screen/home";
import onescreen from "./src/screen/onescreen";
import twoscreen from "./src/screen/twoscreen";
import threescreen from "./src/screen/threescreen";

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
