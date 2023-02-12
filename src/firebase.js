// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyATdse482Loei-_LjJTE6GJPi4TP3OVbyM",
  authDomain: "grocerbud.firebaseapp.com",
  projectId: "grocerbud",
  storageBucket: "grocerbud.appspot.com",
  messagingSenderId: "538207569258",
  appId: "1:538207569258:web:df9c5be8667fb051215113",
  measurementId: "G-TBREYFK7LF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);