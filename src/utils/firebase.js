// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "project-pulse-96e34.firebaseapp.com",
  projectId: "project-pulse-96e34",
  storageBucket: "project-pulse-96e34.firebasestorage.app",
  messagingSenderId: "1084306496845",
  appId: "1:1084306496845:web:edc9b2d1f6ee3a61ebab04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);