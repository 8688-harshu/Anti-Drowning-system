import { Alert, Platform } from 'react-native';

// Stub for Expo Go compatibility since SDK 53 removed remote push features
// and the library triggers errors even for local notifications in some contexts.
export async function configureLocalNotifications() {
    // No-op for now to prevent crashes
    return 'granted';
}

export async function sendLocalAlert(title: string, body: string) {
    // Use native Alert as a fallback that is 100% reliable
    Alert.alert(title, body);
}
