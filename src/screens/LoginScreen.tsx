import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const LoginScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnonymousLogin = async () => {
        try {
            setLoading(true);
            setError('');
            await signInAnonymously(auth);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
                    Drowning Detection
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    Monitor Safety in Real-Time
                </Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />

                {error ? <Text style={{ color: theme.colors.error, marginBottom: 10 }}>{error}</Text> : null}

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.button}
                >
                    Login
                </Button>

                <Button
                    mode="outlined"
                    onPress={async () => {
                        try {
                            setLoading(true);
                            setError('');
                            const { createUserWithEmailAndPassword } = await import('firebase/auth');
                            await createUserWithEmailAndPassword(auth, email, password);
                            // Auto-login happens automatically on success
                        } catch (err: any) {
                            setError(err.message);
                        } finally {
                            setLoading(false);
                        }
                    }}
                    loading={loading}
                    style={styles.button}
                >
                    Create Account
                </Button>

                <Button
                    mode="text"
                    onPress={handleAnonymousLogin}
                    loading={loading}
                    style={styles.button}
                >
                    Continue as Guest
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        opacity: 0.7,
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 6,
    },
});

export default LoginScreen;
