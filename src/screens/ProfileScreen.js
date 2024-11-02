import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const handleGithubLink = () => {
    Linking.openURL('https://github.com/username'); // Ganti dengan URL GitHub yang sesuai
  };

  const handleLogout = () => {
    // Logika untuk logout: ini bisa jadi menghapus token dari AsyncStorage atau mengubah state pengguna
    navigation.replace('Login'); // Ganti dengan nama layar login Anda
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil Pengguna</Text>
      </View>
      <ScrollView contentContainerStyle={styles.profileScrollContainer}>
        <View style={styles.profileContainer}>
          {/* Foto Profil */}
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2024/04/20/14/31/ai-generated-8708695_1280.jpg' }} // Ganti dengan URL foto yang diinginkan
            style={styles.profileImage}
          />
          {/* Nama dan Informasi Lain */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Edi Wicoro</Text>
            <Text style={styles.id}>21120122130073</Text>
            <Text style={styles.group}>Kelompok 17</Text>
          </View>
          <TouchableOpacity style={styles.githubButton} onPress={handleGithubLink}>
            <Feather name="github" size={20} color="#E0E0E0" />
            <Text style={styles.githubButtonText}>Lihat di GitHub</Text>
          </TouchableOpacity>
        </View>
        {/* Bagian Tambahan untuk Menampilkan Info Lain */}
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoTitle}>Informasi Tambahan</Text>
          <View style={styles.infoRow}>
            <Feather name="zap" size={24} color="#E0E0E0" />
            <Text style={styles.infoText}>Praktikum PPB</Text>
          </View>
          <View style={styles.infoRow}>
            <Feather name="eye" size={24} color="#E0E0E0" />
            <Text style={styles.infoText}>Teknik Komputer 22</Text>
          </View>
          <View style={styles.infoRow}>
            <Feather name="shield" size={24} color="#E0E0E0" />
            <Text style={styles.infoText}>Universitas Diponegoro</Text>
          </View>
 
        </View>

                {/* Tombol Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Sesuaikan warna latar belakang
    padding: 16,
  },
  header: {
    backgroundColor: '#1E3D59', // Warna header disesuaikan
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2575fc', // Warna biru untuk border
  },
  headerText: {
    color: '#E0E0E0',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileScrollContainer: {
    paddingBottom: 20, // Padding bawah untuk memberikan ruang saat menggulir
  },
  profileContainer: {
    backgroundColor: '#1E3D59', // Sesuaikan dengan warna background card
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: '#2575fc', // Warna biru untuk border
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#2575fc',
    borderWidth: 2,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    color: '#E0E0E0',
    fontSize: 24,
    fontWeight: 'bold',
  },
  id: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 5,
  },
  group: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 5,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2575fc', // Sesuaikan dengan warna biru terang
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  githubButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D', // Warna tombol logout
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  additionalInfoContainer: {
    marginTop: 20,
    backgroundColor: '#1E3D59',
    borderRadius: 10,
    padding: 15,
    borderColor: '#2575fc',
    borderWidth: 2,
  },
  additionalInfoTitle: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: '#E0E0E0',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
