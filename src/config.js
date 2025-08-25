import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Qr1BphxHvHthV1tn4ixBOMCizpvB3L0",
  authDomain: "e-commerce-website-2bf36.firebaseapp.com",
  projectId: "e-commerce-website-2bf36",
  storageBucket: "e-commerce-website-2bf36.firebasestorage.app",
  messagingSenderId: "378695707731",
  appId: "1:378695707731:web:aa4a93c67c0bf542416aa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth
export const provider = new GoogleAuthProvider();