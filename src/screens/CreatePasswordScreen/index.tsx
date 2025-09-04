import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  // useWindowDimensions,
  Animated,
  TouchableOpacity,
  Text,
  TextInput as RNTextInput
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CreatePasswordScreenNavigationProp } from '../../navigation/types';

type CreatePasswordRouteProp = RouteProp<{ CreatePassword: { email: string } }, 'CreatePassword'>;

const CreatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();
  const route = useRoute<CreatePasswordRouteProp>();
  const { email } = route.params;
  // const { width, height } = useWindowDimensions();
  
  // Responsive scale helpers
  // const base = Math.min(width, height);
  // const scale = (n: number) => (base / 812) * n;


  // State for password fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Animation refs
  const progressAnim = useRef(new Animated.Value(0)).current;
  const minLengthAnim = useRef(new Animated.Value(0)).current;
  const numberAnim = useRef(new Animated.Value(0)).current;
  const symbolAnim = useRef(new Animated.Value(0)).current;
  const matchAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0.95)).current;
  const emailInputScale = useRef(new Animated.Value(1)).current;
  const passwordInputScale = useRef(new Animated.Value(1)).current;
  const confirmInputScale = useRef(new Animated.Value(1)).current;

  // Input refs for focus management
  const passwordInputRef = useRef<RNTextInput>(null);
  const confirmInputRef = useRef<RNTextInput>(null);

  // Calculate password strength (0-100)
  const passwordStrength = hasMinLength && hasNumber && hasSymbol ? 100 : 
    Math.min(100, 
      (hasMinLength ? 33 : 0) + 
      (hasNumber ? 33 : 0) + 
      (hasSymbol ? 34 : 0)
    );

  // Check if all validations pass
  const isFormValid = hasMinLength && hasNumber && hasSymbol && passwordsMatch;

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: passwordStrength,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [passwordStrength, progressAnim]);

  // Animate validation checks
  useEffect(() => {
    Animated.timing(minLengthAnim, {
      toValue: hasMinLength ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasMinLength, minLengthAnim]);

  useEffect(() => {
    Animated.timing(numberAnim, {
      toValue: hasNumber ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasNumber, numberAnim]);

  useEffect(() => {
    Animated.timing(symbolAnim, {
      toValue: hasSymbol ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasSymbol, symbolAnim]);

  useEffect(() => {
    Animated.timing(matchAnim, {
      toValue: passwordsMatch ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [passwordsMatch, matchAnim]);

  // Animate button state
  useEffect(() => {
    Animated.timing(buttonScaleAnim, {
      toValue: isFormValid ? 1 : 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFormValid, buttonScaleAnim]);

  // Validate password on change
  useEffect(() => {
    // Show progress bar when user starts typing password
    if (password.length > 0 && !showProgressBar) {
      setShowProgressBar(true);
    }
    
    setHasMinLength(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password, showProgressBar]);

  // Check if passwords match
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword && password.length > 0);
  }, [password, confirmPassword]);

  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Handle continue - navigate to success screen
  const handleContinue = () => {
    if (isFormValid) {
      navigation.navigate('SuccessSplash');
    }
  };

  // Handle input focus animations
  const handleInputFocus = (inputType: 'email' | 'password' | 'confirm') => {
    const animations = [];
    
    // Reset all scales
    animations.push(
      Animated.parallel([
        Animated.timing(emailInputScale, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(passwordInputScale, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(confirmInputScale, { toValue: 1, duration: 200, useNativeDriver: true }),
      ])
    );

    // Scale up the focused input
    let targetScale: Animated.Value;
    switch (inputType) {
      case 'email':
        targetScale = emailInputScale;
        break;
      case 'password':
        targetScale = passwordInputScale;
        break;
      case 'confirm':
        targetScale = confirmInputScale;
        break;
    }

    animations.push(
      Animated.timing(targetScale, { toValue: 1.02, duration: 200, useNativeDriver: true })
    );

    Animated.sequence(animations).start();
  };

  // Get progress bar color based on strength
  const getProgressColor = () => {
    if (passwordStrength >= 100) return '#4CAF50'; // Green
    if (passwordStrength >= 66) return '#FF9800'; // Orange/Yellow
    return '#F44336'; // Red
  };

  // Render validation row with animation
  const renderValidationRow = (
    isValid: boolean, 
    text: string, 
    animValue: Animated.Value
  ) => (
    <View style={styles.validationRow}>
      <Animated.View style={{
        opacity: animValue,
        transform: [{ scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        })}]
      }}>
        <View style={[styles.validationIcon, isValid && styles.validationIconValid]}>
          {isValid ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <View style={styles.circle} />
          )}
        </View>
      </Animated.View>
      <Text style={[styles.validationText, isValid && styles.validationTextValid]}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F2FF" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.container}>
        <Text style={styles.title}>Create password</Text>
        <Text style={styles.subtitle}>
          Create a strong password for your account
        </Text>

        {/* Email field (read-only) */}
        <Animated.View style={[styles.inputContainer, { transform: [{ scale: emailInputScale }] }]}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.emailInput}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </Animated.View>

        {/* Password field */}
        <Animated.View style={[styles.inputContainer, { transform: [{ scale: passwordInputScale }] }]}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInput}>
            <RNTextInput
              ref={passwordInputRef}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.textInput}
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputFocus('email')}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Password strength progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { 
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  }),
                  backgroundColor: getProgressColor()
                }
              ]} 
            />
          </View>
        </View>

        {/* Password validation rules */}
        <View style={styles.validationContainer}>
          {renderValidationRow(hasMinLength, '8 characters minimum', minLengthAnim)}
          {renderValidationRow(hasNumber, 'a number', numberAnim)}
          {renderValidationRow(hasSymbol, 'a symbol', symbolAnim)}
        </View>

        {/* Confirm Password field */}
        <Animated.View style={[styles.inputContainer, { transform: [{ scale: confirmInputScale }] }]}>
          <Text style={styles.inputLabel}>Re-Enter Password</Text>
          <View style={styles.passwordInput}>
            <RNTextInput
              ref={confirmInputRef}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-Enter Password"
              secureTextEntry={!showConfirmPassword}
              style={styles.textInput}
              onFocus={() => handleInputFocus('confirm')}
              onBlur={() => handleInputFocus('email')}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Password match validation */}
        {confirmPassword.length > 0 && (
          <View style={styles.validationContainer}>
            {renderValidationRow(passwordsMatch, 'Passwords match', matchAnim)}
          </View>
        )}

        {/* Continue Button */}
        <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
            activeOpacity={0.8}
            disabled={!isFormValid}
          >
            <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  backIcon: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101114',
    marginBottom: 8,
  },
  emailInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  emailText: {
    fontSize: 16,
    color: '#666666',
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#101114',
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  validationContainer: {
    marginBottom: 20,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  validationIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationIconValid: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999999',
  },
  validationText: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 12,
  },
  validationTextValid: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#6C4CF1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6C4CF1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonTextDisabled: {
    color: '#999999',
  },
});

export default CreatePasswordScreen;
