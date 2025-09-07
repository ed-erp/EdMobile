import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';

type Slide = {
  id: string;
  image: any;
};

const slides: Slide[] = [
  { id: '1', image: require('../../../assets/onboarding1.png') },
  { id: '2', image: require('../../../assets/onboarding2.png') },
  { id: '3', image: require('../../../assets/onboarding3.png') },
];

const LandingScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  
  const handleGetStarted = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperWrapper}>
        <Swiper
          loop
          autoplay
          autoplayTimeout={3}
          dot={<View style={styles.dot} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
        >
          {slides.map(slide => (
            <View key={slide.id} style={styles.slide}>
              <Image
                source={slide.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleGetStarted}
        >
          <Text>Get Started</Text>
        </Button>
      </View>
    </View>
  );
};

export default LandingScreen;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    swiperWrapper: {
      flex: 1,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    dot: {
      backgroundColor: '#E0E0E0',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: '#6155F5',
      width: 12,
      height: 6,
      borderRadius: 3,
    },
    buttonWrapper: {
      width: '90%',
      alignSelf: 'center',
      marginBottom: 32,
    },
    button: {
      width: '100%',
      height: 48,
      borderRadius: 8,
      backgroundColor: '#6155F5',
      justifyContent: 'center',
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
