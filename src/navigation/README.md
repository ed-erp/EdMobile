# Navigation Structure

This document describes the navigation setup for the React Native app using React Navigation v6.

## Navigation Stack

The app uses a **Stack Navigator** with the following screen hierarchy:

```
SplashScreen (Initial)
├── Home
├── Login
├── SignUp
├── ForgotPassword
├── VerifyOTP
├── CreatePassword
├── SuccessSplash
└── Dashboard
```

## Key Features

### 1. Authentication Flow
- **Login** → **Dashboard**: After successful sign-in, user is redirected to Dashboard
- **Back navigation prevented**: User cannot go back to Login screen from Dashboard using back button
- **Gesture disabled**: Swipe back gesture is disabled on Dashboard screen

### 2. Navigation Utilities

Located in `src/navigation/navigationUtils.ts`, these provide clean, reusable navigation functions:

```typescript
// Navigate to Dashboard (prevents going back)
navigateToDashboard(navigation);

// Navigate to Login and reset entire stack
navigateToLogin(navigation);

// Navigate to any screen with optional params
navigateToScreen(navigation, 'ScreenName', params);

// Safe go back
goBack(navigation);

// Check if can go back
canGoBack(navigation);
```

### 3. Screen Configuration

#### Dashboard Screen
- **gestureEnabled: false**: Prevents swipe back gesture
- **No back button**: User must use logout button to return to Login
- **Clean navigation stack**: Uses `navigation.reset()` to clear history

#### Login Screen
- **Entry point**: Main authentication screen
- **Redirects to Dashboard**: After successful sign-in
- **No back navigation**: User stays in Dashboard until logout

## Usage Examples

### In Login Screen
```typescript
import { navigateToDashboard } from '../../navigation/navigationUtils';

const handleSignIn = () => {
  // TODO: Implement authentication logic
  navigateToDashboard(navigation);
};
```

### In Dashboard Screen
```typescript
import { navigateToLogin } from '../../navigation/navigationUtils';

const handleLogout = () => {
  navigateToLogin(navigation);
};
```

## Security Features

1. **No Back Navigation**: Users cannot accidentally return to Login after authentication
2. **Stack Reset**: Logout completely clears navigation history
3. **Gesture Prevention**: Swipe back gestures are disabled on protected screens

## Adding New Screens

1. **Update types**: Add screen name to `RootStackParamList` in `types.ts`
2. **Add to App.tsx**: Include new screen in Stack.Navigator
3. **Create navigation prop**: Add navigation type to `types.ts`
4. **Use utilities**: Implement navigation using functions from `navigationUtils.ts`

## Best Practices

- Always use navigation utilities instead of direct navigation calls
- Use `gestureEnabled: false` for screens that shouldn't allow back navigation
- Implement proper logout functionality that resets the navigation stack
- Keep navigation logic centralized in utility functions
- Use TypeScript for type-safe navigation
