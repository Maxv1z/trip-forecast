// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const auth = getAuth(app);