// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={globalStyles.pageTitle}>Dream Oracles</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Welcome to Dream Oracles!</Text>
          <Text style={styles.text}>Here you can find the latest updates and features.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  contentContainer: {
    marginTop: 20, // Space between the title and content
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#F0F0F0', // Light text color for contrast
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HomeScreen;
