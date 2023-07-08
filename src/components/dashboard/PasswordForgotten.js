import React, { useEffect, useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const PasswordForgotten = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setMessage('Error resetting password: ' + error.message);
    }
  };

  return (
    <div>
      <section id="signin-section" className="d-flex align-items-center">
        <div className="signin-container">
          <h1>Reset password</h1>
                  <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Reset password</button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </section>
        
      </div>
  );
};

export default PasswordForgotten;
