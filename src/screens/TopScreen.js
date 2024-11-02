import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import godsData from '../data';

const TopScreen = ({ navigation }) => {
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGods = async () => {
      try {
        const response = await axios.get('https://thegreekmythapi.vercel.app/api/gods');
        const apiGods = response.data.Gods;

        // Gabungkan data dari API dengan data dari data.js dan filter yang memiliki gambar
        const combinedGods = apiGods
          .map(apiGod => {
            // Cari gambar dari data.js berdasarkan nama dewa
            const matchedGod = godsData.find(god => god.name === apiGod.name);
            if (matchedGod) {
              return {
                ...apiGod,
                image: matchedGod.image, // Ambil gambar dari data.js jika ada
              };
            }
            return null; // Mengembalikan null jika tidak ada gambar
          })
          .filter(god => god !== null); // Filter hanya yang memiliki gambar



        setGods(combinedGods);
      } catch (error) {
        console.error('Error fetching gods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGods();
  }, []);

  const renderGodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.godItem}
      onPress={() => navigation.navigate('GodDetail', { god: item })}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.godImage} /> // Menampilkan gambar
      )}
      <Text style={styles.godName}>{item.name}</Text>
      <Text style={styles.godDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Gods</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#BB86FC" /> // Mengubah warna loading
      ) : (
        <FlatList
          data={gods}
          keyExtractor={(item) => item.id.toString()} // Pastikan keyExtractor menggunakan id yang benar
          renderItem={renderGodItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Latar belakang gelap
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0E0E0', // Warna teks cerah
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  godItem: {
    backgroundColor: '#1E3D59', // Warna item gelap
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderColor: '#2575fc', // Warna ungu cerah untuk border
    borderWidth: 2,
  },
  godImage: {
    width: '100%', // Menyesuaikan lebar gambar dengan lebar kartu
    height: 200, // Atur tinggi gambar sesuai kebutuhan
    borderRadius: 8,
    marginBottom: 8, // Ruang di bawah gambar
  },
  godName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Warna teks dewa
  },
  godDescription: {
    fontSize: 16,
    color: '#ffffff', // Warna teks deskripsi
  },
});

export default TopScreen;
