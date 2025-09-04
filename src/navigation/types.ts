import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email: string };
  CreatePassword: { email: string };
  SuccessSplash: undefined;
  Home: undefined;
  SignUp: undefined;
  CreatePasswordScreen: undefined;
  Dashboard: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyOTP'>;
export type CreatePasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreatePassword'>;
export type SuccessSplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SuccessSplash'>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
export type CreatePasswordScreenNavigationPropOld = NativeStackNavigationProp<RootStackParamList, 'CreatePasswordScreen'>;
export type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
