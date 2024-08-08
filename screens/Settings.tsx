// SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Settings = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 20,
  },
});

export default Settings;
