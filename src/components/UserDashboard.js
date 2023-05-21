import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { getUserData } from '../services/api';  // If getUserData is your API call to fetch userId

import PersonalInformation from './PersonalInformation';
import SubscriptionDetails from './SubscriptionDetails';
import CurrentlySelectedBrands from './CurrentlySelectedBrands';
import FavouriteItemTracker from './FavouriteItemTracker';
import WhizzleProPricingAndFeatures from './WhizzleProPricingAndFeatures';
import Unsubscribe from './Unsubscribe';
import LogOut from './LogOut';

function UserDashboard() {
  const [userId, setUserId] = useState(null);

  //let op: nu wordt zowel hier als in de subcomponenten een api request gedaan. Nog kiezen of het beter is om dit q
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const data = await getUserData(); 
        setUserId(data.id);  
      } catch (error) {
        console.error('Failed to fetch user id: ', error);
      }
    };

    fetchUserId();
  }, []);


  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
         <div className="dashboard">
          <PersonalInformation userId={userId} />

        <div className="menu">
          <NavLink to="/dashboard/personal-information" activeClassName="active">Personal Information</NavLink>
          <NavLink to="/dashboard/subscription-details" activeClassName="active">Subscription Details</NavLink>
          <NavLink to="/dashboard/currently-selected-brands" activeClassName="active">Selected Brands</NavLink>
          <NavLink to="/dashboard/favourite-item-tracker" activeClassName="active">Favourite Items</NavLink>
          <NavLink to="/dashboard/whizzle-pro-pricing-and-features" activeClassName="active">Whizzle Pro</NavLink>
          <NavLink to="/dashboard/unsubscribe" activeClassName="active">Unsubscribe</NavLink>
          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/dashboard/personal-information" element={<PersonalInformation userId={userId} />} />
            <Route path="/dashboard/subscription-details" element={<SubscriptionDetails userId={userId} />} />
            <Route path="/dashboard/currently-selected-brands" element={<CurrentlySelectedBrands userId={userId} />} />
            <Route path="/dashboard/favourite-item-tracker" element={<FavouriteItemTracker userId={userId} />} />
            <Route path="/dashboard/whizzle-pro-pricing-and-features" element={<WhizzleProPricingAndFeatures userId={userId} />} />
            <Route path="/dashboard/unsubscribe" element={<Unsubscribe userId={userId} />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </div>
      </div>
  );
}

export default UserDashboard;
