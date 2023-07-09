import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../CTX/UserContext';
import { updatePassword } from "firebase/auth";

function ChangePasswordModal({ userData,  userId , closeModal}) {
  const [newPassword, setNewPassword] = useState('')
  const [retypeNewPassword, setRetypeNewPassword] = useState('')
  const [succes , setSucces] = useState('')
  const [error, setError] = useState('')
  
  const {currentUser, setCurrentUser } = useContext(UserContext)

  const changePassword = async (newPassword) => {
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
  
    try {
      await updatePassword(currentUser, newPassword);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Failed to update password:', error);
      throw error; // throw the error so it can be caught in handleSubmit
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // check if the two typed passwords are the same
    if (newPassword !== retypeNewPassword){
      setSucces(false);
      setError("The typed password were not the same");
      return;
    }

    // change the password 
    try {
      await changePassword(newPassword);
      setSucces(true);
      setError('Succes');
      closeModal();
    } catch(error) {
      setSucces(false);
      setError(error.message);
    }
  }

  return (

    <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
    <h1> Change your password </h1>
      <input className = "input-dashboard" type = "password" placeholder="New password" onChange = {(e) => {setNewPassword(e.target.value)}}></input>
      <input className = "input-dashboard" type = "password" placeholder="Repeat new password" onChange = {(e) => {setRetypeNewPassword(e.target.value)}}></input>
      <button className = "change-password" onClick = { (e) => handleSubmit(e)}>
        Change password
      </button>
    {console.log("yooo")}
    {error}
    </div>
    </div>
)
}




export default ChangePasswordModal;


