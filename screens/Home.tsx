// HomeScreen.js
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { AuthContext } from '../components/context/AuthProvider';
import Svg, { Circle } from 'react-native-svg';
import Text from '../components/Text';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, getDreamStreak, dreamStreak } = useContext(AuthContext) ?? {};

  useEffect(() => {
    // Fetch dream streak every time the component is mounted
    getDreamStreak();
  }, []);

  // Calculate progress for the circle (0 to 1 range)
  const progress = Math.min(dreamStreak / 30, 1);

  const navigateToJournal = () => {
    navigation.navigate('Journal', {
      screen: 'JournalDream',
    });
  }

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={globalStyles.pageTitle}>Dream Oracles</Text>
        <View style={styles.contentContainer}>
          <Text style={[globalStyles.goldenRatioTwo, { marginBottom: 10 }]}>
            Welcome back {user?.name}
          </Text>
          <View style={styles.circleContainer}>
            <Svg height="150" width="150" viewBox="0 0 150 150">
              {/* Background Circle with White Stroke */}
              <Circle
                cx="75"
                cy="75"
                r="70"
                stroke="#FFF"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx="75"
                cy="75"
                r="70"
                stroke="#666699"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2 * Math.PI * 70} ${2 * Math.PI * 70}`}
                rotation="-90"
                origin="75, 75"
              />
            </Svg>
            <View style={styles.textContainer}>
              <Text style={styles.streakNumber}>{dreamStreak}</Text>
              <Text style={styles.streakText}>days</Text>
              <Text style={styles.streakText}>dream streak</Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={navigateToJournal}
            >
              <Text style={globalStyles.wideButtonTitle}>Journal New Dream</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: 150,
    height: 150,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding for the text
  },
  streakNumber: {
    fontSize: 32, // Increased font size for better visibility
    color: '#FFF',
    fontWeight: 'bold',
  },
  streakText: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default HomeScreen;
