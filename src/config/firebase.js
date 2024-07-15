
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSCn83aCbVH-r0WoFICUnU-hTnLPS1ZR8",
  authDomain: "akiba-student-e-finances.firebaseapp.com",
  projectId: "akiba-student-e-finances",
  storageBucket: "akiba-student-e-finances.appspot.com",
  messagingSenderId: "112575655905",
  appId: "1:112575655905:web:4fdc34bcaef453ca982ca0",
  measurementId: "G-T1DVK23B61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth,browserLocalPersistence);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize and export Firebase Storage
