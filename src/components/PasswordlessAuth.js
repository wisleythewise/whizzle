import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { sendSignInLinkToEmail as firebaseSendSignInLinkToEmail } from "firebase/auth"; // Import the function

const PasswordlessAuth = ( ) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState('')
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
  }


  useEffect(() =>{
    const url = window.location.origin + "/dashboard"
    
    console.log("this is correct forward url")
    console.log(url)

    setUrl(url)
  },[])

  const sendSignInLinkToEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const actionCodeSettings = {
        url: url,
        handleCodeInApp: true,
      };

      await firebaseSendSignInLinkToEmail(auth, email, actionCodeSettings); // Call the function with the auth instance
      setMessage(`Email sent to ${email}. Check your inbox.`);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    <section id="signin-section" className="d-flex align-items-center">
    <div className="signin-container">
      <h1>Password Authentication</h1>
      <form onSubmit={() => {signIn()}}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </section>
  </div>


  );
};

export default PasswordlessAuth;
