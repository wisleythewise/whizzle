import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the function
import { UserContext } from "./CTX/UserContext"
import { useNavigate } from 'react-router-dom';

const PasswordAuth = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState('')
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the header element by its class or id
    const header = document.querySelector("header");

    if (header) {
      // Save the current background color to restore it later
      const currentBackgroundColor = header.style.backgroundColor;
      // Set the background color of the header to transparent
      header.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // rgba format with 0 opacity
    
      // Return a cleanup function to set the background color back when component unmounts
      return () => {
        header.style.backgroundColor = currentBackgroundColor;
      };
    }
  }, []);

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
      setCurrentUser(user);
      
      navigate('/dashboard');
      // ...
    } catch (error) {
      // Handle errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage);
      
    }
  };

  return (
<div>
  <section id="signin-section" className="d-flex align-items-center">
    <div className="signin-container">
      <h1>Please Log In If You Have an Account</h1>
      <form onSubmit={(event) => { signIn(event) }}>
        <div className="input-group">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            className="email-signin"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            className="password-signin"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error === "auth/wrong-password" && <div className="error-message">You have entered the wrong password</div>}
        <button type="submit" disabled={loading} className="signin-btn">
          {loading ? "Loading..." : "Sign In"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="register-link">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  </section>
</div>

  );
};

export default PasswordAuth;
