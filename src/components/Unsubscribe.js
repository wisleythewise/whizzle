import React, {useContext}from 'react';
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from './CTX/UserContext';

function Unsubscribe( {userId}) {
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
  
    <div className="card" style={{ backgroundImage: 'url("../assets/img/more-services-2.jpg")' }} data-aos="fade-up" data-aos-delay="200">
    <div className="card-body">
      <h5 className="card-title"><a href="">Unsubscribe</a></h5>
      <p className="card-text"> We are sorry to see you go. Please be aware that unsubscribing will result in the complete deletion of your accout, restoring will not be possible</p>
      <button onClick={() => (handleUnsubscribe())}>Unsubscribe</button>
    </div>
      
    </div>
  );
}

export default Unsubscribe;
