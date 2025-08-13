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
import Ionicons from "@expo/vector-icons/Ionicons";
import { RefreshControl } from "react-native-gesture-handler";

const One = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [more, setmore] = useState(true);
  const [isloder, setisloder] = useState(false);
 
  const fetchCharacters = async () => {
    try {
      setLoader(true);
      const response = await character(page);
      console.log("Characters=====>:", response);

      if (response.data.results.length === 0) {
        setmore(false);
      }
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data.results,
      ]);

      //setCharacters(response.data.results);
    } catch (error) {
      
      setError("Failed to fetch characters");
      //console.log("bdjcdb==> Error fetching characters:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const enditam = () => {
    if (!loader && more) {
      setPage((prevPage) => prevPage + 1);
    }
     setLoader(false);
  };
  

  useEffect(()=>{
    console.log('bdjcdb==>',characters.length)
  },[characters])
  if (loader && page === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.page}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  const handleRefresh = async () => {
    setisloder(true);
    setCharacters([]);
    setPage(1);
    setmore(true);
    await fetchCharacters();

    setisloder(false);
  };

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <TouchableOpacity
  //         onPress={() => navigation.goBack()}
  //         style={styles.backButton}
  //       >
  //         <Text style={styles.backText}>Back</Text>
  //       </TouchableOpacity>
  //       <View style={styles.page}>
  //         <Text style={styles.errorText}>{error}</Text>
  //       </View>
  //     </View>
  //   );
  // }

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
            <RefreshControl refreshing={isloder} onRefresh={handleRefresh} />
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
          onEndReached={enditam}
          onEndReachedThreshold={0.5}
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
