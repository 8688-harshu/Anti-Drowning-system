import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, Card, Title, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../theme';

const AboutScreen = ({ navigation }: any) => {
    const theme = useAppTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="About System" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title>Smart Drowning Detection</Title>
                        <Paragraph>
                            This system uses IoT sensors to monitor heart rate and water pressure in real-time.
                            It is designed to provide immediate alerts to lifeguards or family members when abnormal conditions are detected, potentially saving lives.
                        </Paragraph>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Title>How it Works</Title>
                        <Paragraph>
                            1. Wearable enters water.
                            2. Sensors transmit data to Firebase.
                            3. App listens for changes.
                            4. If HR {"<"} 45 or {">"} 130, or Danger Switch is active, an Alert is triggered.
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
    }
});

export default AboutScreen;
