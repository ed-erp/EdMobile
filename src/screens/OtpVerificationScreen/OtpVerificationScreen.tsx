import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ImageBackground,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import BackArrow from '../../icons/BackArrow'; // Import the SVG back arrow
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn } from '../../store/slices/authFlowSlice';

const OtpVerificationScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  const flow = useSelector((state: any) => state.authFlow.flow);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1) {
      if (index < otp.length - 1) {
        setCurrentIndex(index + 1);
        inputs.current[index + 1].focus();
      } else {
        Keyboard.dismiss();
        if (flow === 'login') {
          dispatch(setIsUserLoggedIn(true));
        } else if (flow === 'forgotPassword') {
          navigation.replace('CreatePasswordScreen');
        }
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);

        if (index > 0) {
          setCurrentIndex(index - 1);
          inputs.current[index - 1].focus();
        }
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        setCurrentIndex(index - 1);
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    if (index > currentIndex) {
      inputs.current[currentIndex].focus();
    } else {
      setCurrentIndex(index);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('LoginScreen');
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
          <Text style={styles.title}>Verify email</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Enter the 5-digit verification code sent to{' '}
            <Text style={{ fontWeight: 'bold' }}>sarah.jansen@gmail.com</Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) inputs.current[index] = ref;
              }}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
            />
          ))}
        </View>

        <Text style={styles.editEmail}>
          {timer > 0 ? (
            <>
              Resend OTP in <Text style={styles.timerText}>{timer}</Text>s
            </>
          ) : (
            <Text style={styles.timerText}>Resend OTP</Text>
          )}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    width: 48,
    height: 48,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
  editEmail: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  timerText: {
    color: '#6155F5',
    fontWeight: '600',
  },
});
