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
  Alert,
} from "react-native";
import { character } from "../api/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RefreshControl } from "react-native-gesture-handler";

const One = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
 
  const [more, setMore] = useState(true);

  const fetchCharacters = async (isRefresh: boolean = false) => {
    try {
      if (loader || !more) return;
      setLoader(true);
      const response = await character(isRefresh ? 1 : page);
      console.log("Characters=====>: response", response);

      if (page == 1 || isRefresh) {
        setCharacters(response.data.results);
        setPage(2);
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ]);
        setPage(page + 1);
      }
      // setPage((prev) => prev + 1);
      if (!response.data.info.next) {
        setMore(false);
      }
      //setCharacters(response.data.results);
    } catch (error) {
      setError("Failed to fetch characters");
      //console.log("bdjcdb==> Error fetching characters:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchCharacters(true);
  }, []);

  const loadMoreData = () => {
    if (loader || !more) return;
    

    fetchCharacters();
  };

  useEffect(() => {
    console.log("bdjcdb==>", characters.length);
  }, [characters]);

  const handleRefresh = () => {
    if (loader) return;
    setPage(1);
    
    fetchCharacters(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>One API Data</Text>
      </View>

      <View style={styles.page}>
        <FlatList
          data={characters}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id?.toString() || "key"}
          refreshControl={
            <RefreshControl
              refreshing={loader && page == 1}
              onRefresh={handleRefresh}
            />
          }
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
          onEndReached={loadMoreData}
          onEndReachedThreshold={1}
          ListFooterComponent={
            loader ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      </View>
    </View>
  );
};

export default One;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
    marginTop: 40,
  },
  backButton: {
    // marginBottom: 10,
    padding: 5,

    borderRadius: 10,
    // alignSelf: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 25,
    textAlign: "center",
    left: 30,
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
    backgroundColor: "#c1b6b6",
    borderRadius: 18,
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
