// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Firestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const {
//   REACT_APP_FIREBASE_KEY,
//   REACT_APP_FIREBASE_DOMAIN,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
// } = process.env. ;
console.log(import.meta.env.VITE_NEW_TEST);

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCVuNZ8dW9vnmQ83oAizlFyrxqk-93-HDA",
  authDomain: "reactkage.firebaseapp.com",
  projectId: "reactkage",
  storageBucket: "reactkage.appspot.com",
  messagingSenderId: "678165635031",
  appId: "1:678165635031:web:6713354723ef51831cb592",
  measurementId: "G-HQYFC5GQ7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider()

export async function getAlbums(db: Firestore) {
  const albumsCollection = collection(db, "albums");
  const albumSnapshot = await getDocs(albumsCollection);
  const albumList = albumSnapshot.docs.map((doc) => doc.data());
  return albumList;
}

export default app;
