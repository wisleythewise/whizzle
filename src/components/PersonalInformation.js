import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

import { doc, updateDoc } from "firebase/firestore";


function PersonalInformation({ userData,  userId }) {



  return userData.email ? (
    <div>
      <h1>Personal Information</h1>
      <p>Email: {userData.email}</p>
    </div>
  ) : <p>Loading...</p>;
}

export default PersonalInformation;
