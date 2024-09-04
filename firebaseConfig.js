// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2vvWEddO_qzlWVOyRrA9PvToN91z6BMk",
  authDomain: "booking-system-f3c68.firebaseapp.com",
  projectId: "booking-system-f3c68",
  storageBucket: "booking-system-f3c68.appspot.com",
  messagingSenderId: "863060471168",
  appId: "1:863060471168:web:bf8e5bab627ceeacf72565",
  measurementId: "G-6KGGHJRP1C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};