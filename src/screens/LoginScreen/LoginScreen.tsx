import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Keyboard,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import LogoIcon from '../../icons/LogoIcon';
import { useNavigation } from '@react-navigation/native';
import EyeOffIcon from '../../icons/EyeOffIcon';
import EyeIcon from '../../icons/EyeIcon';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  const renderPasswordIcon = () =>
    secureText ? (
      <EyeOffIcon size={20} color="#6B7280" />
    ) : (
      <EyeIcon size={20} color="#6B7280" />
    );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/loginScreenBackground.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {!keyboardVisible && (
            <LogoIcon width="80px" height="80px" color="#6155F5" />
          )}

          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subTitle}>
            Enter email and password to sign in to your account
          </Text>

          <TextInput
            mode="outlined"
            placeholder="Type your email"
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            outlineColor="#ccc"
            activeOutlineColor="#6155F5"
            outlineStyle={{ borderWidth: 0.5 }}
            contentStyle={{ height: 40 }}
            theme={{ roundness: 8 }}
          />

          <TextInput
            mode="outlined"
            placeholder="Type your password"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            style={styles.input}
            outlineColor="#ccc"
            activeOutlineColor="#6155F5"
            outlineStyle={{ borderWidth: 0.5 }}
            contentStyle={{ height: 40 }}
            theme={{ roundness: 8 }}
            right={
              <TextInput.Icon
                icon={renderPasswordIcon}
                onPress={() => setSecureText(!secureText)}
              />
            }
          />

          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={[
              styles.signInButton,
              !(email && password) && {
                backgroundColor: 'rgba(97, 85, 245, 0.2)',
                borderRadius: 8,
              },
            ]}
            labelStyle={styles.buttonLabel}
            disabled={!email || !password}
          >
            <Text style={{ color: '#FFFFFF' }}>Sign In</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const createStyles = (theme: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#6155F5',
      marginTop: 20,
    },
    subTitle: {
      color: '#7E7E7F',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      marginBottom: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    forgotPassword: {
      alignSelf: 'flex-start',
      color: '#6155F5',
      fontSize: 14,
      //   marginBottom: 40,
    },
    buttonWrapper: {
      width: '100%',
    },
    footer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 20,
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
