import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert, Animated } from 'react-native';
import axios from 'axios';
import godsData from '../data'; 

const HomeScreen = ({ navigation }) => {
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Animasi fade

  useEffect(() => {
    const fetchGods = async () => {
      try {
        const response = await axios.get('https://thegreekmythapi.vercel.app/api/gods');
        const apiGods = response.data.Gods;

        // Gabungkan data dari API dengan data dari data.js
        const combinedGods = apiGods.map(apiGod => {
          // Cari gambar dari data.js berdasarkan nama dewa
          const matchedGod = godsData.find(god => god.name === apiGod.name);
          return {
            ...apiGod,
            image: matchedGod ? matchedGod.image : null, // Ambil gambar dari data.js jika ada
          };
        });

        setGods(combinedGods);
      } catch (error) {
        console.error('Error fetching gods:', error);
      } finally {
        setLoading(false);
        // Memulai animasi fade ketika data sudah dimuat
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    };

    fetchGods();
  }, []);

  const renderGodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.godItem}
      onPress={() => navigation.navigate('GodDetail', { god: item })}
    >
      <Text style={styles.godName}>{item.name}</Text>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.godImage} />
      ) : (
        <Text style={styles.noImage}>Image Not Available</Text>
      )}
    </TouchableOpacity>
  );

  const handleRandomGod = () => {
    const randomIndex = Math.floor(Math.random() * gods.length);
    const randomGod = gods[randomIndex];
    navigation.navigate('GodDetail', { god: randomGod });
  };

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  const filteredGods = gods.filter(god =>
    god.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Gallery of Greek Gods</Text>
      <Image
        source={{ uri: 'https://i.ytimg.com/vi/pQu_uni2krc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBe1iJPbnjSM_Mq_ut0_zKGiWYXYw' }}
        style={styles.backgroundImage}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Gods..."
        placeholderTextColor="#A0AEC0"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <TouchableOpacity style={styles.randomButton} onPress={handleRandomGod}>
        <Text style={styles.buttonText}>Dewa Acak</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredGods}
        keyExtractor={(item) => item.name} // Menggunakan nama sebagai key
        renderItem={renderGodItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderColor: '#2575fc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1E3D59',
    color: '#E0E0E0',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  randomButton: {
    backgroundColor: '#2575fc',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  godItem: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#1B263B',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  godName: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  godImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  noImage: {
    color: '#E0E0E0',
    textAlign: 'center',
  },
  loading: {
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default HomeScreen;
