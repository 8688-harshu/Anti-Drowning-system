import { initializeApp, getApps, getApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Correct Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCf2l8lrgp3UjTm13kNmssf5imH2Cb6X-A",
    authDomain: "smartdrowningsystem-54b80.firebaseapp.com",
    databaseURL: "https://smartdrowningsystem-54b80-default-rtdb.firebaseio.com",
    projectId: "smartdrowningsystem-54b80",
    storageBucket: "smartdrowningsystem-54b80.firebasestorage.app",
    messagingSenderId: "614666922004",
    appId: "1:614666922004:web:98a5ce3ef9cbe47d50df01",
};

// ✅ Prevent duplicate initialization
const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

// ✅ Initialize Auth safely (React Native)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Realtime Database
export const database = getDatabase(app);
