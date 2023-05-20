import React from 'react';

import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';


function Unsubscribe( {userId}) {

  
  const handleUnsubscribe = async () => {
      const userDocRef = doc(db, 'Users', userId);
    await deleteDoc(userDocRef);
  };

  return (
    <div>
      <h1>Unsubscribe</h1>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
    </div>
  );
}

export default Unsubscribe;
