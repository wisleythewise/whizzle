import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function SubscriptionDetails({ userData }) {


  return userData.subscriptions ? (
    <div>
      <h1>Subscription Details</h1>
      {userData.subscriptions.map(subscription => <p key={subscription}>{subscription}</p>)}
    </div>
  ) : <p>Loading...</p>;
}

export default SubscriptionDetails;
