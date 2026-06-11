import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIN6tixSPavGYi4LRnuY2-UWVtJyRJwiU",
  authDomain: "quan-ly-hoc-them.firebaseapp.com",
  projectId: "quan-ly-hoc-them",
  storageBucket: "quan-ly-hoc-them.firebasestorage.app",
  messagingSenderId: "231629150204",
  appId: "1:231629150204:web:56f8ba2f55787127460479",
  measurementId: "G-P8B30EPW05",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);