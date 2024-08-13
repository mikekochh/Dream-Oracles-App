// SleepSoundCard.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text'; // Adjust the import path if necessary
import { globalStyles } from '../styles/globalStyles';

const SleepSoundsCard = ({ image, title, description }) => {
  return (
    <View style={globalStyles.sleepSoundsContainer}>
      <Image source={image} style={globalStyles.sleepSoundsImage} />
      <View style={globalStyles.sleepSoundsTextContainer}>
        <Text style={globalStyles.sleepSoundsName}>{title}</Text>
        <Text style={globalStyles.sleepSoundsDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default SleepSoundsCard;
