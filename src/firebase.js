// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbCoy4XKctwroZ8dPgPrKMV41LESfWNSQ",
  authDomain: "trainingapp-633f2.firebaseapp.com",
  projectId: "trainingapp-633f2",
  storageBucket: "trainingapp-633f2.firebasestorage.app",
  messagingSenderId: "386855680208",
  appId: "1:386855680208:web:21808bce229cc0c02006d5"
};

//const app = initializeApp(firebaseConfig);
//export const db = getFirestore(app);

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
