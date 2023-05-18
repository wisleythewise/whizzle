import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function SubscriptionDetails({ userId }) {
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
      <h1>Subscription Details</h1>
      {userData.subscriptions.map(subscription => <p key={subscription}>{subscription}</p>)}
    </div>
  ) : <p>Loading...</p>;
}

export default SubscriptionDetails;
