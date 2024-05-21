// ShootingStar.js
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const ShootingStar = () => {
  const starPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const starOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateStar = () => {
      // Random start position from the right edge, at a random height
      starPosition.setValue({ x: width, y: Math.random() * height / 2 });
      starOpacity.setValue(1);

      Animated.parallel([
        Animated.timing(starPosition, {
          toValue: { x: 0, y: height + 0 },
          duration: 4000, // Adjust duration for slower or faster animation
          useNativeDriver: true,
        }),
        Animated.timing(starOpacity, {
          toValue: 0,
          duration: 4000, // Match the duration with the position animation
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(animateStar, 7000); // Repeat the animation every 5 seconds
      });
    };

    animateStar();
  }, [starPosition, starOpacity]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.trail,
          {
            transform: [
              ...starPosition.getTranslateTransform(),
              { rotate: '-45deg' }, // Angle the trail
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.trailGradient}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.star,
          {
            transform: starPosition.getTranslateTransform(),
            opacity: starOpacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  trail: {
    position: 'absolute',
    width: 300,
    height: 2,
  },
  trailGradient: {
    flex: 1,
  },
});

export default ShootingStar;
