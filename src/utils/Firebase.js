import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxtHk0fBgQ6DVLVtMzgUByutDPo_Ld-pY",
  authDomain: "journi-dev.firebaseapp.com",
  projectId: "journi-dev",
  storageBucket: "journi-dev.appspot.com",
  messagingSenderId: "795283889160",
  appId: "1:795283889160:web:4071acbd5e5bf855de85bd",
  measurementId: "G-YMJS42P1GG",
};

export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
