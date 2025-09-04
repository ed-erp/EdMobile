import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { 
  Button, 
  Text
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SuccessSplashScreenNavigationProp } from '../../navigation/types';

const SuccessSplashScreen: React.FC = () => {
  const navigation = useNavigation<SuccessSplashScreenNavigationProp>();

  // Handle sign in navigation - go back to LoginScreen
  const handleSignIn = () => {
    // Navigate back to LoginScreen and clear the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      
      {/* Main content */}
      <View style={styles.container}>
        {/* Success Checkmark Icon */}
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </View>

        {/* Success Text */}
        <Text style={styles.title}>Your account</Text>
        <Text style={styles.subtitle}>has been successfully created!</Text>

        {/* Sign In Button */}
        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.signInButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Sign In
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  checkmarkContainer: {
    marginBottom: 32,
  },
  checkmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C4CF1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C4CF1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  checkmarkText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#101114',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#101114',
    textAlign: 'center',
    marginBottom: 48,
  },
  signInButton: {
    borderRadius: 12,
    height: 56,
    backgroundColor: '#6C4CF1',
    width: '100%',
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

export default SuccessSplashScreen;
