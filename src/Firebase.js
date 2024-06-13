// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-clone-426203.firebaseapp.com",
  projectId: "x-clone-426203",
  storageBucket: "x-clone-426203.appspot.com",
  messagingSenderId: "34066462093",
  appId: "1:34066462093:web:603bf4b0bbcb26350439c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);