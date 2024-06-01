// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { runTransaction } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8mYi2eKg4XjkUSP_Wupmz0ekh7ixqDlo",
    authDomain: "comp-identifier-696de.firebaseapp.com",
    databaseURL: "https://comp-identifier-696de-default-rtdb.firebaseio.com",
    projectId: "comp-identifier-696de",
    storageBucket: "comp-identifier-696de.appspot.com",
    messagingSenderId: "155040761446",
    appId: "1:155040761446:web:42c554b03490c237414fa7",
    measurementId: "G-C6H1KWXDRH"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const firestore = getFirestore(firebase);