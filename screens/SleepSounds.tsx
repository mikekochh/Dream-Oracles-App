import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';

// Define the data for each button
const sleepOptions = [
  {
    id: '1',
    title: 'Meditation',
    description: 'Use our sleep meditation tool to prime your brain for sleep.',
  },
  {
    id: '2',
    title: 'Breath Work',
    description: 'Do some breath work that emphasizes grounding, calmness, and promoting good sleep.',
  },
  {
    id: '3',
    title: 'Frequencies',
    description: 'Play some sound wavelengths while you sleep to promote deeper sleep, uninterrupted sleep, or wavelengths that promote more vivid dreams.',
  },
  {
    id: '4',
    title: 'Bedtime Stories',
    description: 'Tune out the brain chatter and revisit that relaxing childhood feeling of having a bedtime story read to you before going to sleep.',
  },
];

const SleepSounds = () => {
  const navigation = useNavigation();

  const handlePress = (id) => {
    switch (id) {
      case '1':
        navigation.navigate('Meditation');
        break;
      case '2':
        navigation.navigate('BreathWork');
        break;
      case '3':
        navigation.navigate('Frequencies');
        break;
      case '4':
        navigation.navigate('BedtimeStories');
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={globalStyles.wideButton} onPress={() => handlePress(item.id)}>
      <Text style={globalStyles.wideButtonTitle}>{item.title}</Text>
      <Text style={styles.buttonDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
        <Text style={globalStyles.pageSmallTitle}>Sleep Sounds</Text>

        <FlatList
          data={sleepOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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

export default SleepSounds;
