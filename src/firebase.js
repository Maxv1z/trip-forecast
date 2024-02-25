// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Modify the import statement
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJBuHcImJ8arlHshS9L6N2xeJc9gwjfWE",
    authDomain: "trip-forecast-app.firebaseapp.com",
    projectId: "trip-forecast-app",
    storageBucket: "trip-forecast-app.appspot.com",
    messagingSenderId: "556995200756",
    appId: "1:556995200756:web:f4b478baae812a92a400a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // Pass the app instance to getFirestore()
export const storage = getStorage(app);

export const auth = getAuth(app);
