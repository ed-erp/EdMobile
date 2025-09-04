import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  TextInput as RNTextInput
} from 'react-native';
import { 
  Button, 
  Text, 
  IconButton
} from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { VerifyOTPScreenNavigationProp } from '../../navigation/types';

type VerifyOTPRouteProp = RouteProp<{ VerifyOTP: { email: string } }, 'VerifyOTP'>;

const VerifyOTPScreen: React.FC = () => {
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route = useRoute<VerifyOTPRouteProp>();
  const { email } = route.params;
  
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const otpRefs = useRef<RNTextInput[]>([]);

  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP key press
  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    if (otpString.length === 5) {
      // TODO: Implement actual OTP verification logic
      navigation.navigate('CreatePassword', { email });
    }
  };

  // Check if OTP is complete
  const isOtpComplete = otp.every(digit => digit !== '');

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
        <Text style={styles.title}>Verify email</Text>
        <Text style={styles.subtitle}>
          Enter the 5-digit OTP sent to {email}
        </Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(ref) => {
                if (ref) otpRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleOtpKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Wrong email link */}
        <Button
          mode="text"
          onPress={handleGoBack}
          textColor="#6C4CF1"
          style={styles.wrongEmailButton}
          labelStyle={styles.wrongEmailLabel}
        >
          Wrong email? Edit email
        </Button>

        {/* Verify Button */}
        <Button
          mode="contained"
          onPress={handleVerifyOTP}
          style={styles.verifyButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          disabled={!isOtpComplete}
        >
          Verify
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1.25,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
  },
  wrongEmailButton: {
    marginBottom: 32,
  },
  wrongEmailLabel: {
    fontSize: 14,
    color: '#6C4CF1',
  },
  verifyButton: {
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

export default VerifyOTPScreen;