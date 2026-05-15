import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

const TITLE = 'Soft Touch';

export default function IndexScreen() {
  const router = useRouter();
  
  // Animation values
  const needleAnim = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;

  // Character animations
  const charAnimations = useRef(
    TITLE.split('').map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Needle animation (sewing motion)
    Animated.sequence([
      Animated.timing(needleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Character animations - staggered
    charAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 500 + index * 100,
        useNativeDriver: true,
      }).start();
    });

    // Subtitle animation
    Animated.timing(subtitleOpacity, {
      toValue: 1,
      duration: 800,
      delay: 1700,
      useNativeDriver: true,
    }).start();

    // Description animation
    Animated.timing(descriptionOpacity, {
      toValue: 1,
      duration: 800,
      delay: 2400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Needle rotation animation
  const needleRotation = needleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '45deg', '0deg'],
  });

  // Needle vertical movement
  const needleTranslateY = needleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 30, 0],
  });

  return (
    <View style={styles.container}>
      {/* Animated Needle */}
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.needle,
            {
              transform: [
                { rotate: needleRotation },
                { translateY: needleTranslateY },
              ],
            },
          ]}
        >
          <Text style={styles.needleEmoji}>🪡</Text>
        </Animated.View>
      </View>

      {/* Animated Content */}
      <View style={styles.content}>
        {/* Title - Character by character */}
        <View style={styles.titleContainer}>
          {TITLE.split('').map((char, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.titleChar,
                { opacity: charAnimations[index] },
              ]}
            >
              {char}
            </Animated.Text>
          ))}
        </View>

        {/* Subtitle */}
        <Animated.View style={{ opacity: subtitleOpacity }}>
          <Text style={styles.subtitle}>Fashion Catalog</Text>
        </Animated.View>

        {/* Description */}
        <Animated.View style={{ opacity: descriptionOpacity }}>
          <Text style={styles.description}>
            Discover amazing fashion designs and shop with ease
          </Text>
        </Animated.View>
      </View>

      {/* Buttons - Always visible and clickable */}
      <View style={styles.buttonContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed
          ]}
          onPress={() => {
            console.log('Login button pressed');
            router.push('/login');
          }}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed
          ]}
          onPress={() => {
            console.log('Sign Up button pressed');
            router.push('/country-select');
          }}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  animationContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 0,
  },
  needle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  needleEmoji: {
    fontSize: 80,
  },
  threadContainer: {
    position: 'absolute',
    top: 100,
    width: 2,
    height: 80,
    alignItems: 'center',
  },
  thread: {
    width: 2,
    height: 80,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  titleChar: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 60,
    pointerEvents: 'auto',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonPressed: {
    opacity: 0.7,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
