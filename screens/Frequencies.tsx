import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import SleepSoundsCard from '../components/SleepSoundsCard'; // Import the SleepSoundCard component

// Dummy data for frequencies exercises
const frequencyExercises = [
  {
    exerciseID: '1',
    exerciseName: 'Restful Frequencies',
    exerciseDescription: 'Play a relaxing frequency to help you enter deeper sleep',
    exerciseImage: require('../assets/images/frequencyImage1.jpeg'),
  },
];

const Frequencies = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <SleepSoundsCard
      image={item.exerciseImage}
      title={item.exerciseName}
      description={item.exerciseDescription}
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
        <Text style={[globalStyles.pageSmallTitle, {marginTop: 50}]}>Frequencies</Text>
        <Text style={[globalStyles.pageText, { textAlign: 'center' }]}>Relax with sound frequencies</Text>
        <FlatList
          data={frequencyExercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.exerciseID}
          contentContainerStyle={{ padding: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};


export default Frequencies;
