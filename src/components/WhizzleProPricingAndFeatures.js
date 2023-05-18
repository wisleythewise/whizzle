import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function WhizzleProPricingAndFeatures({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      setUserData(data);
    };

    fetchUserData();
  }, [userId]);

  return userData ? (
    <div>
      <h1>Whizzle Pro Pricing And Features</h1>
      <p>Pro User Status: {userData.isProUser ? 'Yes' : 'No'}</p>
    </div>
  ) : <p>Loading...</p>;
}

export default WhizzleProPricingAndFeatures;
