import React, { useState, useContext } from "react";
import { auth } from "../firebaseConfig";
import {  signInWithEmailAndPassword  } from "firebase/auth"; // Import the function
import { UserContext } from "./CTX/UserContext"
import { useNavigate } from 'react-router-dom';

const PasswordAuth = ( ) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState('')
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const signIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The user is signed in
      var user = userCredential.user;
      setCurrentUser(user)
      
      navigate('/dashboard');
      // ...
    } catch (error) {
      // Handle errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage);
      
    } 

  }



  return (
    <div>
    <section id="signin-section" className="d-flex align-items-center">
    <div className="signin-container">
      <h1>Password Authentication</h1>
      <form onSubmit={(event) => {signIn(event)}}>
      <input
          className="email-signin"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
      />
      <input
          className="password-signin"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
      />
      {error !== "auth/wrong-password"? "": <div>You have entered the wrong password</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
          
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </section>
  </div>)
};

export default PasswordAuth;