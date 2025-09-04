import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar
} from 'react-native';
import { 
  Button, 
  Text, 
  TextInput, 
  IconButton
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordScreenNavigationProp } from '../../navigation/types';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');


  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Handle send OTP - navigate to VerifyOTP screen
  const handleSendOTP = () => {
    if (email.trim()) {
      navigation.navigate('VerifyOTP', { email: email.trim() });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleGoBack}
          style={styles.backButton}
          iconColor="#000000"
        />
      </View>

      {/* Main content */}
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email below to reset password
        </Text>

        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          outlineStyle={styles.inputOutline}
          style={styles.input}
          // left={<TextInput.Icon icon="email-outline" />}
        />

        <Button
          mode="contained"
          onPress={handleSendOTP}
          style={styles.sendButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          disabled={!email.trim()}
        >
          Send OTP
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F2FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    margin: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#101114',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  input: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1.25,
  },
  sendButton: {
    borderRadius: 12,
    height: 56,
    backgroundColor: '#6C4CF1',
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ForgotPasswordScreen;
