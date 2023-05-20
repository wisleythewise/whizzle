import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

function FavouriteItemTracker({ userData }) {


  return userData.favouriteItems ? (
    <div>
      <h1>Favourite Items</h1>
      {userData.favouriteItems.map(item => <p key={item}>{item}</p>)}
    </div>
  ) : <p>Loading...</p>;
}

export default FavouriteItemTracker;
