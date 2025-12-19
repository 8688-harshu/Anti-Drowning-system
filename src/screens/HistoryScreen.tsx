import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, useTheme, Card, Text, List } from 'react-native-paper';
import { useAppTheme } from '../theme';

const MOCK_HISTORY = [
    { id: 1, time: '10:30 AM', heartRate: 72, pressure: 1013, status: 'Normal' },
    { id: 2, time: '10:31 AM', heartRate: 75, pressure: 1013, status: 'Normal' },
    { id: 3, time: '10:32 AM', heartRate: 140, pressure: 1015, status: 'Danger' }, // Abnormal
    { id: 4, time: '10:33 AM', heartRate: 80, pressure: 1014, status: 'Normal' },
];

const HistoryScreen = ({ navigation }: any) => {
    const theme = useAppTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="History" />
            </Appbar.Header>
            <View style={styles.content}>
                <FlatList
                    data={MOCK_HISTORY}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 10, borderColor: item.status === 'Danger' ? theme.colors.error : 'transparent', borderWidth: item.status === 'Danger' ? 1 : 0 }}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text variant="titleMedium">{item.time}</Text>
                                    <Text variant="labelLarge" style={{ color: item.status === 'Danger' ? theme.colors.error : theme.colors.primary }}>
                                        {item.status}
                                    </Text>
                                </View>
                                <Text>HR: {item.heartRate} bpm | Pressure: {item.pressure} hPa</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
    }
});

export default HistoryScreen;
