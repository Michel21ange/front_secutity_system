import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSDhLcgsy5OliTL8VvHVsEMSYG9O0rr4g",
    authDomain: "school-project.firebaseapp.com",
    projectId: "school-projects-e214d",
    storageBucket: "school-project.appspot.com",
    messagingSenderId: "291870815035",
    appId: "1:962950014503:web:a93c49804d847f1f77d002"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()

