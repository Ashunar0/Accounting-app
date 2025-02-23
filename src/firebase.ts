// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0E1IRBzNtWSnmrneVhnM8Bs4krhx2Ao8",
  authDomain: "accounting-app-af027.firebaseapp.com",
  projectId: "accounting-app-af027",
  storageBucket: "accounting-app-af027.firebasestorage.app",
  messagingSenderId: "982686068643",
  appId: "1:982686068643:web:65a69dc7abe1ec9c337416",
  measurementId: "G-WXETXMRLYJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
