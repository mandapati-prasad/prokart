// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDFyNORbjvXkYHlvVKzHZ9imgM6Y-FCQnI",
  authDomain: "pro-kart-6ff6c.firebaseapp.com",
  projectId: "pro-kart-6ff6c",
  storageBucket: "pro-kart-6ff6c.appspot.com",
  messagingSenderId: "531226330226",
  appId: "1:531226330226:web:71451e7e84f48b2589aeeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
