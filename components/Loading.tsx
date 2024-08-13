import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Text from './Text'; // Adjust the import if your Text component is in a different location

const Loading = ({ loadingText }) => {
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot1Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();
    };

    animateDots();
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.loadingContainer}>
        <Text style={styles.loadingText}>{loadingText}</Text>
        <View style={globalStyles.dotsContainer}>
          <Animated.View style={[globalStyles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[globalStyles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[globalStyles.dot, { opacity: dot3Opacity }]} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    width: '66%'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
