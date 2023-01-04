// Import the functions you need from the SDKs you need
// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEu5fZJxfSOKl-ld_IOp9Nrj2qacNaBhc",
  authDomain: "next-js-chat-app-1c7f5.firebaseapp.com",
  projectId: "next-js-chat-app-1c7f5",
  storageBucket: "next-js-chat-app-1c7f5.appspot.com",
  messagingSenderId: "501371099519",
  appId: "1:501371099519:web:c827c388354cbb2d69224a",
  measurementId: "G-VZBXF744LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db }