// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Text style={styles.text}>Here you can find the latest updates and features.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff', // Light background color
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark text color
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;
