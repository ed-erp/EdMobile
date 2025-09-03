// SignInScreen.tsx
import React, { useMemo, useState, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  Keyboard,
  Alert,
  StatusBar,
} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  Checkbox,
  TouchableRipple,
  useTheme,
  MD3LightTheme,
  Snackbar,
  ActivityIndicator,
  Portal,
  Dialog,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// ---- Theme ---------------------------------------------------------------
const theme = {
  ...MD3LightTheme,
  roundness: 14,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6E56F8',
    onPrimary: '#FFFFFF',
    secondary: '#4B72FF',
    outline: '#D7DCE1',
    surface: '#FFFFFF',
    background: '#F5F7FB',
    error: '#FF5252',
    success: '#4CAF50',
  },
};

// ---- Reusable GradientButton --------------------------------------------
type GradientButtonProps = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  testID?: string;
};

const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  loading,
  disabled,
  onPress,
  testID,
}) => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={disabled ? ['#CCCCCC', '#AAAAAA'] : ['#5C5AF7', '#7B5CF8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.gradient,
        disabled ? { opacity: 0.6 } : null
      ]}
    >
      <Button
        testID={testID}
        mode="contained"
        onPress={onPress}
        loading={loading}
        disabled={disabled || loading}
        contentStyle={styles.gradientBtnContent}
        labelStyle={styles.gradientBtnLabel}
        uppercase={false}
        style={{ backgroundColor: 'transparent', elevation: 0 }}
        rippleColor="rgba(255,255,255,0.25)"
        textColor={colors.onPrimary}
      >
        {label}
      </Button>
    </LinearGradient>
  );
};

// ---- Main Screen ---------------------------------------------------------
const SignInInner: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'info' });
  const [biometricDialog, setBiometricDialog] = useState(false);

  const spacing = useMemo(() => Math.max(16, Math.min(24, width * 0.05)), [width]);

  // --- Validation ---
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const showSnackbar = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setSnackbar({ visible: true, message, type });
  };

  // --- Handlers ---
  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();

    if (!validateEmail(email)) {
      showSnackbar('Please enter a valid email address', 'error');
      return;
    }
    if (!validatePassword(password)) {
      showSnackbar('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // fake API
      showSnackbar('Sign in successful!', 'success');

      // Navigate to Dashboard after success
      setTimeout(() => {
        // @ts-ignore
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }, 1000);
    } catch (error) {
      showSnackbar('Sign in failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

  const handleForgotPassword = () => {
    // @ts-ignore
    navigation.navigate('ForgotPassword');
  };

  // --- Biometric login simulation ---
 

  return (
    <SafeAreaView style={[styles.safe, { paddingTop: spacing }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F2FF" />
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { padding: spacing }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoWrap}>
              <Image
                source={require('../../Images/Logo/one.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <Text variant="headlineLarge" style={styles.title} selectable={false}>
              Sign in
            </Text>

            {/* Email */}
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              placeholderTextColor="#A0A6AE"
              left={<TextInput.Icon icon="email-outline" />}
            />

            {/* Password */}
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              secureTextEntry={secure}
              autoCapitalize="none"
              returnKeyType="done"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              placeholderTextColor="#A0A6AE"
              right={
                <TextInput.Icon
                  icon={secure ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setSecure((s) => !s)}
                  forceTextInputFocus={false}
                />
              }
            />

            {/* Remember + Forgot */}
            <View style={styles.rowBetween}>
              <TouchableRipple
                borderless
                onPress={() => setRemember((r) => !r)}
                style={styles.rememberHit}
              >
                <View style={styles.rememberRow}>
                  <Checkbox.Android
                    status={remember ? 'checked' : 'unchecked'}
                    onPress={() => setRemember((r) => !r)}
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple borderless onPress={handleForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password ?</Text>
              </TouchableRipple>
            </View>

            {/* CTA */}
            <View style={{ height: 20 }} />
            <GradientButton
              label="Sign In"
              loading={loading}
              onPress={handleSubmit}
              testID="sign-in-button"
            />

           
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        duration={3000}
        style={[
          snackbar.type === 'error' && { backgroundColor: '#FF5252' },
          snackbar.type === 'success' && { backgroundColor: '#4CAF50' },
        ]}
      >
        {snackbar.message}
      </Snackbar>

      {/* Biometric Dialog */}
      <Portal>
        <Dialog visible={biometricDialog} dismissable={false}>
          <Dialog.Content style={{ alignItems: 'center', paddingVertical: 24 }}>
            <ActivityIndicator size="large" color="#6E56F8" />
            <Text style={{ marginTop: 16, textAlign: 'center' }}>
              Please verify using biometrics
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setBiometricDialog(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

// Wrap in PaperProvider
const SignInScreen: React.FC = () => {
  return (
    <PaperProvider 
    settings={{
      icon: (props) => <MaterialCommunityIcons {...props} />,
    }}
   theme={theme}>
      <SignInInner />
    </PaperProvider>
  );
};

export default SignInScreen;

// ---- Styles --------------------------------------------------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#d1d8e7ff',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 9 },
    elevation: 6,
    marginTop: "99%",
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
    letterSpacing: 0.2,
    color: '#121826',
    marginBottom: 18,
  },
  input: {
    marginTop: 12,
  },
  inputOutline: {
    borderRadius: 14,
    borderWidth: 1,
  },
  rowBetween: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberHit: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingRight: 8,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 15,
    color: '#2C3442',
  },
  forgotText: {
    fontSize: 15,
    color: '#4B72FF',
    fontWeight: '600',
  },
  gradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientBtnContent: {
    height: 56,
  },
  gradientBtnLabel: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
