import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';

// Define the data for each button
const sleepOptions = [
  {
    id: '1',
    title: 'Meditation',
    description: 'Use our sleep meditation tool to prime your brain for sleep.',
    bannerPic: require('../assets/images/meditationsBanner.jpeg'),
  },
  {
    id: '2',
    title: 'Breath Work',
    description: 'Breathing exercises that emphasizes grounding, calmness, and good sleep.',
    bannerPic: require('../assets/images/breathWorkBanner.jpeg'),
  },
  {
    id: '3',
    title: 'Frequencies',
    description: 'Sounds you can play at night to promote restful sleep and stronger dreams.',
    bannerPic: require('../assets/images/frequenciesBanner.jpeg'),
  },
  {
    id: '4',
    title: 'Bedtime Stories',
    description: 'Revisit the soothing comfort of a bedtime story before sleep, tuning out the days chatter.',
    bannerPic: require('../assets/images/bedtimeStoriesBanner.jpeg'),
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
    <TouchableOpacity style={globalStyles.sleepSoundsContainer} onPress={() => handlePress(item.id)}>
        <Image 
          source={item.bannerPic} 
          style={globalStyles.sleepSoundsImage} 
        />
        <View style={globalStyles.sleepSoundsTextContainer}>
          <Text style={globalStyles.sleepSoundsName}>{item.title}</Text>
          <Text style={globalStyles.sleepSoundsDescription}>{item.description}</Text>
        </View>
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
          contentContainerStyle={{ padding: 10 }}
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
