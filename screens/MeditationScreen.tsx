// MeditationScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MeditationScreen = () => {
  const handleStartMeditation = () => {
    // Implement start meditation functionality here
    console.log('Meditation started');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation</Text>
      <Text style={styles.description}>
        Take a deep breath and relax. Enjoy a moment of peace and mindfulness.
      </Text>
      <Button title="Start Meditation" onPress={handleStartMeditation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b', // Dark teal color
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#004d40', // Darker teal color
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MeditationScreen;
