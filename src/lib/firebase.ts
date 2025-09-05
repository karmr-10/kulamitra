// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "kulamitra",
  "appId": "1:701157389287:web:ea35cb2e166c491f6a0342",
  "storageBucket": "kulamitra.firebasestorage.app",
  "apiKey": "AIzaSyDHhknrrBGmBEbKQVtgOEck7Q6kqE2SLq8",
  "authDomain": "kulamitra.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "701157389287"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
