import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function configureLocalNotifications() {
    if (Platform.OS === 'android') {
        // Create a dedicated channel for critical alerts to ensure sound plays
        await Notifications.setNotificationChannelAsync('urgent_alert', {
            name: 'Critical Alerts',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'default', // Explicitly request default sound
            enableVibrate: true,
        });
    }

    // Only request permissions. DO NOT ask for Push Token (this triggers Expo Go crash)
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    return finalStatus;
}

export async function sendLocalAlert(title: string, body: string) {
    // Schedule a local notification that fires immediately
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            sound: true, // Default system notification sound
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { type: 'alert' },
        },
        trigger: {
            channelId: 'urgent_alert', // Force use of our new loud channel
            seconds: 1, // trigger after 1 second
        },
    });
}
