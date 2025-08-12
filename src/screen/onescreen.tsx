import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { character } from "../api/user";

const One = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [errora, setErrora] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoader(true);
        const response = await character();
        console.log("Characters=====>:", response);
        setCharacters(response.data.results);
      } catch (error) {
        setError("Failed to fetch characters");
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

  if (error) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.page}>
          <Text style={styles.errorText}>{error}</Text>
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
          keyExtractor={(item) => item.id?.toString() || "key"}
          renderItem={({ item }) => (
            <View style={styles.characterItem}>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.characterImage}
                />
              )}
              <View style={styles.characterDetails}>
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  ID: {item.id}
                </Text>
                <Text style={styles.characterText}>URL: {item.url}</Text>
                <Text style={styles.characterText}>Name: {item.name}</Text>
                <Text style={styles.characterText}>Gender: {item.gender}</Text>
                <Text style={styles.characterText}>Status: {item.status}</Text>
                <Text style={styles.characterText}>
                  Species: {item.species}
                </Text>
                <Text style={styles.characterText}>
                  Origin: {item.origin.name}
                </Text>
                <Text style={styles.characterText}>
                  Location: {item.location.name} ({item.location.url})
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default One;

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
    flexDirection: "row",
    alignItems: "flex-start",
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterDetails: {
    flex: 1,
  },
  characterText: {
    fontSize: 14,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
