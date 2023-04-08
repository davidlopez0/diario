// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf86dGWGawrjDmzAQvXifqmPBIo_c7AN4",
  authDomain: "journal-acaca.firebaseapp.com",
  projectId: "journal-acaca",
  storageBucket: "journal-acaca.appspot.com",
  messagingSenderId: "33451197661",
  appId: "1:33451197661:web:7efeb966af60ed18d84734",
  measurementId: "G-8N09G4ZQ7V"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);