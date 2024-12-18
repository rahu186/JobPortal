// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm2LXMEsSVFZ0iz7vXeH8ztFoA-REuG8E",
  authDomain: "job-portal-a88cb.firebaseapp.com",
  projectId: "job-portal-a88cb",
  storageBucket: "job-portal-a88cb.appspot.com",
  messagingSenderId: "162274910545",
  appId: "1:162274910545:web:9360988cc0a1e4b51e3370"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
export default app;
