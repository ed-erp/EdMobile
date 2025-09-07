import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoIcon from '../../icons/LogoIcon';
import { useTheme } from 'react-native-paper';

const SplashScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LandingScreen');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LogoIcon width="80px" height="80px" color="#6155F5" />
    </View>
  );
};

export default SplashScreen;

const createStyles = (theme: any) =>
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6155F5',
  },
  logo: { width: 150, height: 150, resizeMode: 'contain' },
});
