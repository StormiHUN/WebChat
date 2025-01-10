import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCf2TJc3qTosmAAMJz7AUHVTND7QHglzk",
  authDomain: "webchat-18db1.firebaseapp.com",
  projectId: "webchat-18db1",
  storageBucket: "webchat-18db1.firebasestorage.app",
  messagingSenderId: "936631320798",
  appId: "1:936631320798:web:987db029380080ad51824f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)