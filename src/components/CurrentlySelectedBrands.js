import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function CurrentlySelectedBrands({ userId }) {
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
      <h1>Currently Selected Brands</h1>
      {userData.brands.map(brand => <p key={brand}>{brand}</p>)}
    </div>
  ) : <p>Loading...</p>;
}

export default CurrentlySelectedBrands;
