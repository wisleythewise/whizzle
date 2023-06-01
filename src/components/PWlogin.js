import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

const PasswordAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    // } catch (error) {
    //   if (error.code === "auth/invalid-email") {
    //     setError("Invalid email address");
    //   } else if (error.code === "auth/user-not-found") {
    //     setError("No user found with this email");
    //   } else if (error.code === "auth/wrong-password") {
    //     setError("Incorrect password");
    //   } else {
    //     setError("Error signing in");
    //   }
    // }
    setLoading(false);
  };

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      header.style.backgroundColor = 'transparent';
    }

    return () => {
      if (header) {
        header.style.backgroundColor = ''; // Reset the background color when the component is unmounted
      }
    };
  }, []);

  return (
    <section id="signin-section" className="d-flex align-items-center">
      <div className="signin-container">
        <h1>Password Authentication</h1>
        <form onSubmit={signIn}>
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
  );
};

export default PasswordAuth;
