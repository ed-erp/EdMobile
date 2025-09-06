import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
      textSecondary: string;
    }
    interface Theme {
      spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      borderRadius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      fonts: {
        regular: string;
        medium: string;
        bold: string;
      };
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    customPrimary: "#6155F5",
    customTextPrimary: "#000000",
    customTextSecondary: "#6C757D",
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
