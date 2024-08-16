import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import SleepSoundsCard from '../components/SleepSoundsCard'; // Import the SleepSoundCard component

// Dummy data for bedtime stories
const bedtimeStories = [
  {
    storyID: '1',
    storyName: 'The Moonlit Voyage',
    storyDescription: 'Embark on a magical journey across the seas under a starry sky.',
    storyImage: require('../assets/images/bedtimeStoryImage1.jpeg'), // Replace with actual image paths
  },
  {
    storyID: '2',
    storyName: 'The Enchanted Forest',
    storyDescription: 'Explore a mystical forest where the trees whisper secrets of old.',
    storyImage: require('../assets/images/bedtimeStoryImage2.jpeg'), // Replace with actual image paths
  },
];

const BedtimeStories = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <SleepSoundsCard
      image={item.storyImage}
      title={item.storyName}
      description={item.storyDescription}
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
        <Text style={[globalStyles.pageSmallTitle, {marginTop: 50}]}>Bedtime Stories</Text>
        <Text style={[globalStyles.pageText, { textAlign: 'center' }]}>Drift off to sleep with soothing tales</Text>
        <FlatList
          data={bedtimeStories}
          renderItem={renderItem}
          keyExtractor={(item) => item.storyID}
          contentContainerStyle={{ padding: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BedtimeStories;
