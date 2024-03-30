// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlsrrTU6vwIfPjrSXioC86Iq7EKCpihxA",
  authDomain: "irun-77aab.firebaseapp.com",
  projectId: "irun-77aab",
  storageBucket: "irun-77aab.appspot.com",
  messagingSenderId: "567104072370",
  appId: "1:567104072370:web:204e6d72675bdebd33b7ab"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestoreDB = getFirestore(app);

export { firestoreDB }