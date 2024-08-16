import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import SleepSoundsCard from '../components/SleepSoundsCard'; // Import the SleepSoundCard component

// Dummy data for breath work exercises
const breathWorkExercises = [
  {
    exerciseID: '1',
    exerciseName: 'Deep Breathing',
    exerciseDescription: 'A simple deep breathing exercise to help relax and reduce stress.',
    exerciseImage: require('../assets/images/breathworkImage1.jpeg'), // Replace with actual image paths
  },
];

const BreathWork = () => {
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
        <Text style={[globalStyles.pageSmallTitle, {marginTop: 50}]}>Breath Work</Text>
        <Text style={[globalStyles.pageText, { textAlign: 'center' }]}>Breath exercises for sleep</Text>
        <FlatList
          data={breathWorkExercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.exerciseID}
          contentContainerStyle={{ padding: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BreathWork;
