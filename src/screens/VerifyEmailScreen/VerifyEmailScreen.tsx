import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import BackArrow from '../../icons/BackArrow';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Text, useTheme, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setFlow } from '../../store/slices/authFlowSlice';

const VerifyEmailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigation.navigate('LoginScreen');
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError('');
    } else if (!emailRegex.test(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  const handleVerifyEmail = () => {
    validateEmail(email);
    if (!error && email) {
      dispatch(setFlow("forgotPassword"));
      navigation.navigate('OtpVerificationScreen');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/otpVerificationBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackArrow size={24} color="#6155F5" onPress={handleGoBack} />
          </View>
          <Text style={styles.title}>Enter email</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Enter your registered email to receive verification OTP
          </Text>
        </View>

        <View style={styles.emailContainer}>
          <TextInput
            mode="outlined"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              validateEmail(text);
            }}
            style={styles.input}
            outlineColor="#ccc"
            activeOutlineColor="#6155F5"
            outlineStyle={{ borderWidth: 0.5 }}
            contentStyle={{ height: 40 }}
            theme={{ roundness: 8 }}
            error={!!error}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleVerifyEmail}
          style={[
            styles.signInButton,
            (!email || !!error) && {
              backgroundColor: 'rgba(97, 85, 245, 0.2)',
              borderRadius: 8,
            },
          ]}
          labelStyle={styles.buttonLabel}
          disabled={!email || !!error}
        >
          <Text style={{ color: '#FFFFFF' }}>Send OTP</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6155F5',
    textAlign: 'center',
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 20,
    marginLeft: 4,
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
  footer: {
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
