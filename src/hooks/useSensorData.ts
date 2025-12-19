import { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../services/firebase';

interface SensorData {
    heartRate: number;
    waterPressure: number;
    danger: boolean;
}

export const useSensorData = () => {
    const [data, setData] = useState<SensorData>({
        heartRate: 0,
        waterPressure: 0,
        danger: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sensorRef = ref(database, 'sensorData');

        // Create a listener
        const unsubscribe = onValue(sensorRef, (snapshot) => {
            setLoading(false);
            const val = snapshot.val();
            if (val) {
                setData({
                    heartRate: val.heartRate || 0,
                    waterPressure: val.waterPressure || 0,
                    danger: val.danger || false,
                });
                setError(null);
            } else {
                setError('No data available');
            }
        }, (err) => {
            setLoading(false);
            setError(err.message);
        });

        // Cleanup listener on unmount
        return () => {
            // off(sensorRef); // In Firebase v9+, the unsubscribe function returned by onValue handles this.
            unsubscribe();
        };
    }, []);

    return { data, loading, error };
};
