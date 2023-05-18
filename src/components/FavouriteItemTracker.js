import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function FavouriteItemTracker({ userId }) {
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
      <h1>Favourite Items</h1>
      {userData.favouriteItems.map(item => <p key={item}>{item}</p>)}
    </div>
  ) : <p>Loading...</p>;
}

export default FavouriteItemTracker;
