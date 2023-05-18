import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function PersonalInformation({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data: ', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return userData ? (
    <div>
      <h1>Personal Information</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  ) : <p>Loading...</p>;
}

export default PersonalInformation;
