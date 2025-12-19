import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { useAppTheme } from '../theme';

interface SensorCardProps {
    title: string;
    value: string | number;
    unit: string;
    icon: string;
    color?: string;
    status?: 'normal' | 'warning' | 'danger';
}

const SensorCard = ({ title, value, unit, icon, color, status = 'normal' }: SensorCardProps) => {
    const theme = useAppTheme();

    const getStatusColor = () => {
        switch (status) {
            case 'danger': return theme.colors.error;
            case 'warning': return theme.colors.warning;
            case 'normal': default: return theme.colors.primary; // Or a neutral color
        }
    };

    const statusColor = color || getStatusColor();

    return (
        <Card style={styles.card} mode="elevated">
            <View style={[styles.indicator, { backgroundColor: statusColor }]} />
            <Card.Content style={styles.content}>
                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                        <IconButton icon={icon} size={24} iconColor={statusColor} />
                    </View>
                    <Text variant="titleMedium" style={styles.title}>{title}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text variant="displayMedium" style={{ color: statusColor, fontWeight: 'bold' }}>
                        {value}
                    </Text>
                    <Text variant="labelLarge" style={[styles.unit, { color: theme.colors.onSurfaceVariant }]}>
                        {unit}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        overflow: 'hidden', // Ensure indicator stays inside
        backgroundColor: 'white', // Ensure opaque background
    },
    indicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        zIndex: 1,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        borderRadius: 8,
        marginRight: 12,
    },
    title: {
        opacity: 0.8,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
    unit: {
        marginLeft: 8,
        fontSize: 16,
    },
});

export default SensorCard;
