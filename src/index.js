import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { auth } from './firebaseConfig';
import { sendSignInLinkToEmail } from "firebase/auth";


import { isSignInWithEmailLink as firebaseIsSignInWithEmailLink } from "firebase/auth"; // Import the function

const handleSignIn = async () => {
  if (!firebaseIsSignInWithEmailLink(auth, window.location.href)) return; // Call the function with the auth instance

  let email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    email = window.prompt("Please provide your email for confirmation");
  }

  try {
    await auth.signInWithEmailLink(email, window.location.href);
    window.localStorage.removeItem("emailForSignIn");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

handleSignIn();
handleSignIn();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
