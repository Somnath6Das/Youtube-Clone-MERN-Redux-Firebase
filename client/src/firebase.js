import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBLrvpQ87L8j7EqMz87mW6KOyOgofWrIlk",
  authDomain: "mern-a7b82.firebaseapp.com",
  projectId: "mern-a7b82",
  storageBucket: "mern-a7b82.appspot.com",
  messagingSenderId: "89043638142",
  appId: "1:89043638142:web:6d0ffbc558fd0c126f052f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;