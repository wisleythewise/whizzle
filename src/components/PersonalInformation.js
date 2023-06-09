import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './CTX/UserContext';
import { updatePassword } from "firebase/auth";

function PersonalInformation({ userData,  userId }) {
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
    e.preventDefault()
    
    // check if the two typed passwords are the same
    if (newPassword === retypeNewPassword){
      // change the password 
      try {
        await changePassword(newPassword)
        setSucces(true)
      }catch(error){
        setSucces(false)
        setError(error)
      }

    }else{
      setSucces(false)
      setError("The typed password were not the same")
    }
    
    
    return
  }

  const message = () => {
    return succes === ''
      ? <div></div>
      : succes
      ? <div>Success</div>
      : <div>{error.message}</div>
  }


  return (
    <div>
      <h1> Change your password </h1>
      <input placeholder="New password" onChange = {(e) => {setNewPassword(e.target.value)}}></input>
      <input placeholder="Repeat new password" onChange = {(e) => {setRetypeNewPassword(e.target.value)}}></input>
      <button onClick = { (e) => handleSubmit(e)}>
        Change password
      </button>

    {message()}
    </div>
    
    )
}

export default PersonalInformation;
