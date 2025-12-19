import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Appbar, useTheme, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/firebase';
import { useSensorData } from '../hooks/useSensorData';
import SensorCard from '../components/SensorCard';
import { useAppTheme } from '../theme';

import { configureLocalNotifications, sendLocalAlert } from '../services/notifications';

const DashboardScreen = ({ navigation }: any) => {
    const theme = useAppTheme();
    const { data, loading, error } = useSensorData();
    const [abnormal, setAbnormal] = useState(false);

    useEffect(() => {
        configureLocalNotifications();
    }, []);

    // Logic for abnormal detection
    useEffect(() => {
        const isAbnormal =
            data.heartRate < 45 ||
            data.heartRate > 130 ||
            data.danger;

        // Only trigger if state changes from normal to abnormal to avoid spam
        if (isAbnormal && !abnormal) {
            sendLocalAlert('⚠ Drowning Alert', 'Abnormal conditions detected! Immediate action required.');
        }

        setAbnormal(isAbnormal);

    }, [data]);

    const handleLogout = () => {
        auth.signOut();
    };

    const getStatus = () => {
        if (loading) return { text: "Connecting...", color: theme.colors.secondary };
        if (error) return { text: "Sensor Offline", color: theme.colors.error };
        if (abnormal) return { text: "DANGER DETECTED", color: theme.colors.error };
        return { text: "System Normal", color: theme.colors.safe ?? '#4CAF50' };
    };

    const status = getStatus();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
                <Appbar.Content title="Dashboard" subtitle="Smart Drowning Alert" />
                <Appbar.Action icon="logout" onPress={handleLogout} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Status Banner */}
                <Card style={[styles.statusCard, { backgroundColor: status.color }]}>
                    <Card.Content style={{ alignItems: 'center' }}>
                        <Text variant="headlineSmall" style={{ color: '#fff', fontWeight: 'bold' }}>
                            {status.text}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {loading ? 'Waiting for signal...' : error ? error : abnormal ? 'Immediate Action Required' : 'Monitoring Active'}
                        </Text>
                    </Card.Content>
                </Card>

                <View style={styles.grid}>
                    <SensorCard
                        title="Heart Rate"
                        value={data.heartRate}
                        unit="BPM"
                        icon="heart-pulse"
                        status={data.heartRate < 45 || data.heartRate > 130 ? 'danger' : 'normal'}
                    />

                    <SensorCard
                        title="Water Pressure"
                        value={data.waterPressure}
                        unit="hPa"
                        icon="water"
                        status="normal" // Assuming pressure is usually just informational unless extreme
                        color={theme.colors.primary}
                    />
                </View>

                {data.danger && (
                    <Card style={[styles.alertCard, { backgroundColor: theme.colors.errorContainer }]}>
                        <Card.Content>
                            <Text variant="titleMedium" style={{ color: theme.colors.onErrorContainer }}>
                                ⚠ SOS Signal Received
                            </Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.onErrorContainer }}>
                                The manual danger switch or algorithm has detected a drowning risk.
                            </Text>
                        </Card.Content>
                    </Card>
                )}

                <View style={{ flexDirection: 'row', marginTop: 24, gap: 10 }}>
                    <Button mode="outlined" onPress={() => navigation.navigate('History')} style={{ flex: 1 }}>
                        History
                    </Button>
                    <Button mode="outlined" onPress={() => navigation.navigate('About')} style={{ flex: 1 }}>
                        About
                    </Button>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    statusCard: {
        marginBottom: 24,
        borderRadius: 16,
    },
    grid: {
        gap: 8,
    },
    alertCard: {
        marginTop: 24,
        borderColor: 'red',
        borderWidth: 2,
    }
});

export default DashboardScreen;
