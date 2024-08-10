// SleepScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';

const SleepScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
        <Text style={globalStyles.pageSmallTitle}>Sleep Sounds</Text>

        {/* Meditation Button */}
        <TouchableOpacity style={globalStyles.wideButton}>
          <Text style={globalStyles.wideButtonTitle}>Meditation</Text>
          <Text style={styles.buttonDescription}>
            Use our sleep meditation tool to prime your brain for sleep.
          </Text>
        </TouchableOpacity>

        {/* Breath Work Button */}
        <TouchableOpacity style={globalStyles.wideButton}>
          <Text style={globalStyles.wideButtonTitle}>Breath Work</Text>
          <Text style={styles.buttonDescription}>
            Do some breath work that emphasizes grounding, calmness, and promoting good sleep.
          </Text>
        </TouchableOpacity>

        {/* Frequencies Button */}
        <TouchableOpacity style={globalStyles.wideButton}>
          <Text style={globalStyles.wideButtonTitle}>Frequencies</Text>
          <Text style={styles.buttonDescription}>
            Play some sound wavelengths while you sleep to promote deeper sleep, uninterrupted sleep, or wavelengths that promote more vivid dreams.
          </Text>
        </TouchableOpacity>

        {/* Bedtime Stories Button */}
        <TouchableOpacity style={globalStyles.wideButton}>
          <Text style={globalStyles.wideButtonTitle}>Bedtime Stories</Text>
          <Text style={styles.buttonDescription}>
          Tune out the brain chatter and revisit that relaxing childhood feeling of having a bed time story read to you before going to sleep. 
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonDescription: {
    fontSize: 14,
    color: '#F0F0F0', // Lighter text color for contrast
    textAlign: 'center',
  },
});

export default SleepScreen;
