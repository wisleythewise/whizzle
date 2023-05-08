// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoeQkGKkbk22tPfEgb60Ua9_9ZJmvYxQc",
  authDomain: "whistle-58417.firebaseapp.com",
  projectId: "whistle-58417",
  storageBucket: "whistle-58417.appspot.com",
  messagingSenderId: "441473940350",
  appId: "1:441473940350:web:717c9bfdf7cb8853f5512f",
  measurementId: "G-81JPLGV73C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export {app , analytics, db}