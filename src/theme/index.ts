import { MD3LightTheme, MD3DarkTheme, useTheme as usePaperTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Extend the MD3Colors type to include our custom colors
declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            safe: string;
            danger: string;
            warning: string;
        }
    }
}

const customColorsLight = {
    safe: '#388E3C',
    danger: '#D32F2F',
    warning: '#FBC02D',
};

const customColorsDark = {
    safe: '#66BB6A',
    danger: '#EF5350',
    warning: '#FFF176',
};

// We define Paper themes and Navigation themes separately and pass them accordingly
// to avoid merging issues that strip fonts.

export const PaperLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#00796B',
        secondary: '#80CBC4',
        error: '#D32F2F',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        onSurface: '#212121',
        ...customColorsLight,
    },
};

export const PaperDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#80CBC4',
        secondary: '#004D40',
        error: '#EF5350',
        background: '#121212',
        surface: '#1E1E1E',
        onSurface: '#E0E0E0',
        ...customColorsDark,
    },
};

export const NavLightTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        primary: PaperLightTheme.colors.primary,
        background: PaperLightTheme.colors.background,
        card: PaperLightTheme.colors.surface,
        text: PaperLightTheme.colors.onSurface,
        border: 'transparent',
    },
};

export const NavDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        primary: PaperDarkTheme.colors.primary,
        background: PaperDarkTheme.colors.background,
        card: PaperDarkTheme.colors.surface,
        text: PaperDarkTheme.colors.onSurface,
        border: 'transparent',
    },
};

export const useAppTheme = () => usePaperTheme<typeof PaperLightTheme>();
