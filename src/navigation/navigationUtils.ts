import { NavigationProp, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from './types';

/**
 * Navigation utility functions for clean, reusable navigation logic
 */

/**
 * Navigate to Dashboard and prevent going back to previous screens
 * Used after successful authentication
 */
export const navigateToDashboard = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate('Dashboard');
};

/**
 * Navigate to Login and reset the entire navigation stack
 * Used for logout or when user needs to start fresh
 */
export const navigateToLogin = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
};

/**
 * Navigate to a specific screen with parameters
 */
export const navigateToScreen = <T extends keyof RootStackParamList>(
  navigation: NavigationProp<RootStackParamList>,
  screenName: T,
  params?: RootStackParamList[T]
) => {
  if (params) {
    navigation.navigate(screenName, params);
  } else {
    navigation.navigate(screenName);
  }
};

/**
 * Go back to previous screen
 */
export const goBack = (navigation: NavigationProp<RootStackParamList>) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

/**
 * Check if user can go back
 */
export const canGoBack = (navigation: NavigationProp<RootStackParamList>) => {
  return navigation.canGoBack();
};
