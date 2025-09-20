import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import BackArrow from '../../icons/BackArrow';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
  Text,
  useTheme,
  Button,
  ProgressBar,
} from 'react-native-paper';
import EyeOffIcon from '../../icons/EyeOffIcon';
import EyeIcon from '../../icons/EyeIcon';
import CheckBoxIcon from '../../icons/CheckBoxIcon';
import CheckBoxCrossIcon from '../../icons/CheckboxCrossIcon';

const CreatePasswordScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePasswordText, setSecurePasswordText] = useState(true);
  const [secureConfirmPasswordText, setSecureConfirmPasswordText] =
    useState(true);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleGoBack = () => {
    navigation.navigate('OtpVerificationScreen');
  };

  const renderPasswordIcon = () =>
    securePasswordText ? (
      <EyeOffIcon size={20} color="#6B7280" />
    ) : (
      <EyeIcon size={20} color="#6B7280" />
    );

  const renderConfirmPasswordIcon = () =>
    secureConfirmPasswordText ? (
      <EyeOffIcon size={20} color="#6B7280" />
    ) : (
      <EyeIcon size={20} color="#6B7280" />
    );

  const handleCompleteButton = () => {
    validateConfirmPassword(confirmPassword);
    if (!error && password && confirmPassword) {
      navigation.navigate('CongratulationsScreen');
    }
  };

  const rules = useMemo(() => {
    return {
      length: password.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const passedRules = Object.values(rules).filter(Boolean).length;
  const progress = passedRules / 3;

  const getProgressColor = () => {
    if (passedRules === 1) return 'red';
    if (passedRules === 2) return 'yellow';
    if (passedRules === 3) return 'green';
    return '#D1D5DB';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setError('');
    } else if (value !== password) {
      setError('Passwords do not match');
    } else {
      setError('');
      setShowError(false);
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
          <Text style={styles.title}>Create password</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Create a strong password for your account
          </Text>
        </View>

        <View style={styles.passwordsContainer}>
          <TextInput
            mode="outlined"
            placeholder="Enter password"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={securePasswordText}
            style={styles.input}
            outlineColor="#ccc"
            activeOutlineColor="#6155F5"
            outlineStyle={{ borderWidth: 0.5 }}
            contentStyle={{ height: 40 }}
            theme={{ roundness: 8 }}
            onFocus={() => {
              setShowPasswordRules(true);
              setShowError(false);
            }}
            onBlur={() => setShowPasswordRules(false)}
            right={
              <TextInput.Icon
                icon={renderPasswordIcon}
                onPress={() => setSecurePasswordText(!securePasswordText)}
              />
            }
          />

          {showPasswordRules && (
            <>
              <ProgressBar
                progress={progress}
                color={getProgressColor()}
                style={styles.progressBar}
              />
              <View style={styles.rulesContainer}>
                <RuleItem label="8 characters minimum" passed={rules.length} />
                <RuleItem label="a number" passed={rules.number} />
                <RuleItem label="a symbol" passed={rules.symbol} />
              </View>
            </>
          )}

          <TextInput
            mode="outlined"
            placeholder="Re-enter password"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              validateConfirmPassword(text);
            }}
            onFocus={() => setShowError(true)}
            secureTextEntry={secureConfirmPasswordText}
            style={styles.input}
            outlineColor="#ccc"
            activeOutlineColor="#6155F5"
            outlineStyle={{ borderWidth: 0.5 }}
            contentStyle={{ height: 40 }}
            theme={{ roundness: 8 }}
            error={!!error && showError}
            disabled={passedRules < 3}
            right={
              <TextInput.Icon
                icon={renderConfirmPasswordIcon}
                onPress={() =>
                  setSecureConfirmPasswordText(!secureConfirmPasswordText)
                }
              />
            }
          />

          {showError && error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleCompleteButton}
          style={[
            styles.signInButton,
            (!password || passedRules < 3 || !confirmPassword || !!error) && {
              backgroundColor: 'rgba(97, 85, 245, 0.2)',
              borderRadius: 8,
            },
          ]}
          labelStyle={styles.buttonLabel}
          disabled={passedRules < 3 || !password || !confirmPassword || !!error}
        >
          <Text style={{ color: '#FFFFFF' }}>Complete</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

const RuleItem = ({ label, passed }: { label: string; passed: boolean }) => (
  <View style={styles.ruleItem}>
    {passed ? (
      <CheckBoxIcon width="18px" height="18px" color="green" />
    ) : (
      <CheckBoxCrossIcon width="18px" height="18px" color="#9CA3AF" />
    )}
    <Text style={[styles.ruleText, { color: passed ? 'green' : '#374151' }]}>
      {label}
    </Text>
  </View>
);

export default CreatePasswordScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
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
  passwordsContainer: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  rulesContainer: {
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ruleText: {
    marginLeft: 8,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    alignSelf: 'flex-start',
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
