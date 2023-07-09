import React, {useContext}from 'react';
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../CTX/UserContext';

function DeleteAccountModal( {userId, closeModal}) {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  
  const handleUnsubscribe = async  () => {
    deleteUser(user).then(() => {
      setCurrentUser(null)
      console.log('User deleted');
      navigate("/")
    }).catch((error) => {
      console.error('Error deleting user', error);
    });
  }
  
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
            <p className="card-text"> We are sorry to see you go. Please be aware that unsubscribing will result in the complete deletion of your accout, restoring will not be possible</p>
            <button onClick={() => (handleUnsubscribe())}>Unsubscribe</button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
