import React, { useEffect, useState } from 'react';
import { getAuth, isSignInWithEmailLink, confirmPasswordReset, connectAuthEmulator  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [changePassword, setChangePassword] = useState(false)

  const auth = getAuth();

  useEffect(() => {
    const header = document.querySelector("header");

    if (header) {
      const currentBackgroundColor = header.style.backgroundColor;
      header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
      return () => {
        header.style.backgroundColor = currentBackgroundColor;
      };
    }
  }, []);

  useEffect(() => {
    if (!changePassword) {
      return;
    }

  const auth = getAuth();


    console.log("1")
        // Get the URL parameters
        const params = new URLSearchParams(window.location.search);
        // Get the oobCode
        const oobCode = params.get('oobCode');

        // Use oobCode in the confirmPasswordReset function
        confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
    console.log("4")

          window.localStorage.removeItem('emailForSignIn');
          navigate('/');
          setMessage('Password has been reset.');
          setChangePassword(false); // Reset the flag
        })
        .catch((error) => {
    console.log("5")

          console.error('Error resetting password: ', error);
          setMessage('Error resetting password: ' + error.message);
          setChangePassword(false); // Reset the flag
        });
    
  }, [navigate, changePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword === retypeNewPassword){
      setChangePassword(true)
    } else {
      setError("The typed password were not the same")
    }
  }

  return (
    <div>
      <section id="signin-section" className="d-flex align-items-center">
        <div className="signin-container">
          <h1>Reset password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="retype password"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
            />
            <button type="submit">Reset password</button>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
