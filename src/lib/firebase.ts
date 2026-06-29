import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3Z1ibNl1hdk3qUYTdvShZUbGML6FHQ2U",
  authDomain: "gen-lang-client-0178987700.firebaseapp.com",
  projectId: "gen-lang-client-0178987700",
  storageBucket: "gen-lang-client-0178987700.firebasestorage.app",
  messagingSenderId: "320474443413",
  appId: "1:320474443413:web:a40a2e4fc79c763dfcb59c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
