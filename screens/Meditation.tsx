import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import SleepSoundsCard from '../components/SleepSoundsCard'; // Import the new component

// Get the device width to calculate the correct height for 16:9 ratio
const { width } = Dimensions.get('window');
const imageHeight = (width / 16) * 9; // Calculate height for 16:9 ratio

// Dummy data for meditations
const meditations = [
  {
    meditationID: '1',
    meditationName: 'Calm Mind',
    meditationDescription: 'A guided meditation to calm your mind and prepare for sleep.',
    meditationImage: require('../assets/images/meditationImage1.jpeg'), // Replace with actual image paths
  },
  {
    meditationID: '2',
    meditationName: 'Deep Relaxation',
    meditationDescription: 'A deep relaxation exercise to ease you into restful sleep.',
    meditationImage: require('../assets/images/meditationImage2.jpeg'), // Replace with actual image paths
  },
];

const Meditation = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <SleepSoundsCard
      image={item.meditationImage}
      title={item.meditationName}
      description={item.meditationDescription}
      isModalScreen={true}
    />
  );

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={[globalStyles.backgroundImage]}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
          <View style={globalStyles.backButtonCircle}>
            <Image source={require('../assets/images/backLink.png')} style={globalStyles.backButtonImage} />
          </View>
        </TouchableOpacity>
        <Text style={[globalStyles.pageSmallTitle, {marginTop: 50}]}>Meditations</Text>
        <Text style={[globalStyles.pageText, { textAlign: 'center' }]}>Meditations to help you sleep</Text>
        <FlatList
          data={meditations}
          renderItem={renderItem}
          keyExtractor={(item) => item.meditationID}
          contentContainerStyle={{ padding: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Meditation;
