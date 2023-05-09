import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendSignInLinkToEmail as firebaseSendSignInLinkToEmail } from "firebase/auth"; // Import the function

const PasswordlessAuth = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const sendSignInLinkToEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const actionCodeSettings = {
        url: window.location.href,
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
      <h1>Passwordless Authentication</h1>
      <form onSubmit={sendSignInLinkToEmail}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send sign-in link</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordlessAuth;
