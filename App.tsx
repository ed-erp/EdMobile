 
import { Animated, Dimensions, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CreatePasswordScreen from './src/screens/CreatePasswordScreen';
import LoginScreenPaper from './src/screens/LoginScreen';
import VerifyOTPScreen from './src/screens/VerifyEmailScreen';
import SuccessSplashScreen from './src/screens/SuccessSplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';

// Navigation types
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
 
      <PaperProvider
        theme={{
          version: 3,
          colors: {
            primary: '#6C4CF1',
            onPrimary: '#FFFFFF',
            surface: '#FFFFFF',
            background: '#F6F2FF',
            outline: 'rgba(0,0,0,0.08)',
            secondary: '#8E7CF8',
          } as any,
        }}
      >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
 
  const [isLoading, setIsLoading] = useState(true);
   const translateX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate splash out to the left
      Animated.timing(translateX, {
        toValue: -screenWidth,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsLoading(false));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

   if (isLoading) {
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <SplashScreen />
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right'
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="Login" component={LoginScreenPaper} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
        <Stack.Screen name="SuccessSplash" component={SuccessSplashScreen} />
        
        {/* Other Screens */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            gestureEnabled: false, // Prevent swipe back gesture
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default App;
