// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnmVnIMQ3H2K3YCHJAIfsKU34aoQQcZ2o",
  authDomain: "live-chat-1e998.firebaseapp.com",
  projectId: "live-chat-1e998",
  storageBucket: "live-chat-1e998.appspot.com",
  messagingSenderId: "279136279071",
  appId: "1:279136279071:web:5a1bec985fdafc47ecd32a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
