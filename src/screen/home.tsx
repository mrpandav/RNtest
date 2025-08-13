import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Home = () => {
  const navigation = useNavigation<any>(); 

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All API list</Text>
      <TouchableOpacity
        style={styles.post}
        onPress={() => navigation.navigate("onescreen")}
      >
        <Text style={styles.boxtitle}>Go to One API</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.post}
        onPress={() => navigation.navigate("twoscreen")}
      >
        <Text style={styles.boxtitle}>Go to Two API</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.post}
        onPress={() => navigation.navigate("threescreen")}
      >
        <Text style={styles.boxtitle}>Go to Three API</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  post: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 25,
    textAlign: "center",
  },
  boxtitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
