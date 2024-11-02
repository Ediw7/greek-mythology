import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Username dan Password harus diisi!');
      return;
    }

    if (username === 'edi07' && password === '123') {
      Alert.alert('Login Berhasil', `Selamat datang, ${username}!`);
      navigation.replace('Tabs');
      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Login Gagal', 'Username atau Password salah!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.overlay}>
        <Image 
          source={{ uri: 'https://hidimas.storage.googleapis.com/ce57a102-6039-4d09-9b67-ec3465336a6b/20231027_142433-thumb-ilustrasi-logo-zeus.jpg' }} 
          style={styles.logo} 
        />
        <Text style={styles.title}>GREEK MYTHOLOGY</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#B0BEC5"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B0BEC5"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#0D1B2A', // Ganti dengan warna solid
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2575fc',
  },
  title: {
    color: '#E0E0E0',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#1E3D59',
    borderColor: '#2575fc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#2575fc', // Sesuaikan dengan warna biru dari gradasi latar belakang
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
