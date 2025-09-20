import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const isUserLoggedIn = useSelector(
    (state: any) => state.authFlow.isUserLoggedIn,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isSplashDone ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isUserLoggedIn ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}
