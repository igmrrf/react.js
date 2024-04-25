// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Firestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyAEF_ucJLGPA_fWUxgfTZtJgzdykeIqyhw",
  authDomain: "react-grmfs.firebaseapp.com",
  projectId: "react-grmfs",
  storageBucket: "react-grmfs.appspot.com",
  messagingSenderId: "1052732707912",
  appId: "1:1052732707912:web:8ffdc665602b55f37d347d",
  measurementId: "G-N4DP2BYQ2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const bucket = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export async function getAlbums(db: Firestore) {
  const albumsCollection = collection(db, "albums");
  const albumSnapshot = await getDocs(albumsCollection);
  const albumList = albumSnapshot.docs.map((doc) => doc.data());
  return albumList;
}

export default app;
