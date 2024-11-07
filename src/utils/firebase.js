// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {

  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,

  authDomain: "project-management-6fb57.firebaseapp.com",

  projectId: "project-management-6fb57",

  storageBucket: "project-management-6fb57.firebasestorage.app",

  messagingSenderId: "422847005071",

  appId: "1:422847005071:web:d5a7c28366ed1904b98bfa"


};


const app = initializeApp(firebaseConfig);