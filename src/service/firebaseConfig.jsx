// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJwK4evYgNJ30hReurmPuD6JGL_joBfZ8",
  authDomain: "quick-plan-3903a.firebaseapp.com",
  projectId: "quick-plan-3903a",
  storageBucket: "quick-plan-3903a.appspot.com",
  messagingSenderId: "67617348743",
  appId: "1:67617348743:web:e9f72b8b22d70b6b54ac22",
  measurementId: "G-T35HDD7L2V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);