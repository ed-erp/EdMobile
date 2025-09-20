import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen/OtpVerificationScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen/VerifyEmailScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen/CreatePasswordScreen';
import CongratulationsScreen from '../screens/CongratulationsSceen/CongratulationsScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
      <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
      <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
      <Stack.Screen name="CongratulationsScreen" component={CongratulationsScreen} />
    </Stack.Navigator>
  );
}
