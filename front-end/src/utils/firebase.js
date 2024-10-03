// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "socialsync-6e1b4.firebaseapp.com",
  projectId: "socialsync-6e1b4",
  storageBucket: "socialsync-6e1b4.appspot.com",
  messagingSenderId: "957015672329",
  appId: "1:957015672329:web:8af2ae37a448f739b29ad8",
  measurementId: "G-2KN43D6EBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export { app };
