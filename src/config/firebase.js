import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAke74HcnMK3JP6umyKaTxic_dfXC2-BrY",
  authDomain: "polar-strata-370709.firebaseapp.com",
  projectId: "polar-strata-370709",
  storageBucket: "polar-strata-370709.appspot.com",
  messagingSenderId: "602736330872",
  appId: "1:602736330872:web:26300afd23e6a6332e058d",
  measurementId: "G-EL3116Z0Z2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);