import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 2000, // Loading time of 2 seconds
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('Login');
    });
  }, [navigation, loadingProgress]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://hidimas.storage.googleapis.com/ce57a102-6039-4d09-9b67-ec3465336a6b/20231027_142433-thumb-ilustrasi-logo-zeus.jpg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Greek Mythology</Text>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: loadingProgress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1B2A',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#0D1B2A',
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
  loadingBar: {
    height: 10,
    backgroundColor: '#2575fc',
    marginTop: 20,
  },
});

export default SplashScreen;