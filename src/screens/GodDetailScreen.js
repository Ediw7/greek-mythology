import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';

const GodDetailScreen = ({ route }) => {
  const { god } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{god.name}</Text>
        
        {/* Menampilkan gambar dewa */}
        <Image source={{ uri: god.image }} style={styles.godImage} />

        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Origin:</Text>
          <Text style={styles.attributeValue}>{god.attributes.origin}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Abode:</Text>
          <Text style={styles.attributeValue}>{god.attributes.abode}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Symbols:</Text>
          <Text style={styles.attributeValue}>{god.attributes.symbols.join(', ')}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Powers:</Text>
          <Text style={styles.attributeValue}>{god.attributes.powers.join(', ')}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Family:</Text>
          <Text style={styles.attributeValue}>
            Parents - {god.attributes.family.parents.join(', ')}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Stories:</Text>
          <Text style={styles.attributeValue}>{god.attributes.stories.join(', ')}</Text>
        </View>

        <Text style={styles.description}>{god.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', 
    padding: 0,
  },
  detailContainer: {
    padding: 24,
    backgroundColor: '#0D1B2A', 
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E0E0E0', 
    textAlign: 'center',
    marginBottom: 20,
  },
  godImage: {
    width: '100%', // Menggunakan lebar penuh untuk gambar
    height: 200,   // Tinggi gambar
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  attributeContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1E3D59', 
    borderWidth: 1,
    borderColor: '#2575fc', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  attributeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  attributeValue: {
    fontSize: 18,
    color: '#E0E0E0',
  },
  description: {
    fontSize: 18,
    marginTop: 24,
    color: '#E0E0E0', 
  },
});

export default GodDetailScreen;
