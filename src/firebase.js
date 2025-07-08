// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaL4JVQQMsuD0KXxv5Ht37HdmjvmY-aEI",
  authDomain: "sukoon-db918.firebaseapp.com",
  projectId: "sukoon-db918",
  storageBucket: "sukoon-db918.firebasestorage.app",
  messagingSenderId: "679446387778",
  appId: "1:679446387778:web:d20d53ba499eeae02061db",
  measurementId: "G-SCP6NQ5JPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

