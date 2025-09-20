import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CheckBoxIcon from '../../icons/CheckBoxIcon';

const CongratulationsScreen = () => {
  const navigation = useNavigation<any>();

  const handleSignIn = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: 'LandingScreen' },
        { name: 'LoginScreen' },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <CheckBoxIcon width={48} height={48} color="#7C3AED" />
      </View>

      <Text style={styles.message}>
        Your password{'\n'}has been successfully created!
      </Text>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.signInButton}
          labelStyle={styles.buttonLabel}
        >
          <Text style={{ color: '#FFFFFF' }}>Sign In</Text>
        </Button>
      </View>
    </View>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconWrapper: {
    marginBottom: 24,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 48,
    padding: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 40,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  signInButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#6155F5',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
