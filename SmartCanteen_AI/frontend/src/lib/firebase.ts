// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq34BRlAu7toTRMw5l0HihusZrjOan_iw",
  authDomain: "campus-kitchen-282aa.firebaseapp.com",
  databaseURL: "https://campus-kitchen-282aa-default-rtdb.firebaseio.com",
  projectId: "campus-kitchen-282aa",
  storageBucket: "campus-kitchen-282aa.firebasestorage.app",
  messagingSenderId: "769102234932",
  appId: "1:769102234932:web:288d9c137d460104bd1161",
  measurementId: "G-12FCQ00JCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
