import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { episode } from "../api/user";

const threescreen = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoader(true);

        const response = await episode();
        console.log("Characters=====>:", response);
        setCharacters(response.data.results);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching characters:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchCharacters();
  }, []);
  if (loader) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.page}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.page}>
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.characterItem}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default threescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
  },
  heder: {
    alignItems: "center",
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  characterItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
