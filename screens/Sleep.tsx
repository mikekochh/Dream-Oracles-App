// SleepScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const SleepScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
        <Text style={globalStyles.pageTitle}>Sleep Sounds</Text>

        {/* Meditation Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Meditation</Text>
          <Text style={styles.buttonDescription}>
            Use our sleep meditation tool to prime your brain for sleep.
          </Text>
        </TouchableOpacity>

        {/* Breath Work Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Breath Work</Text>
          <Text style={styles.buttonDescription}>
            Do some breath work that emphasizes grounding, calmness, and promoting good sleep.
          </Text>
        </TouchableOpacity>

        {/* Frequencies Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Frequencies</Text>
          <Text style={styles.buttonDescription}>
            Play some sound wavelengths while you sleep to promote deeper sleep, uninterrupted sleep, or wavelengths that promote more vivid dreams.
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#666699', // Lighter blue background for buttons
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color for contrast
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#F0F0F0', // Lighter text color for contrast
    textAlign: 'center',
  },
});

export default SleepScreen;
