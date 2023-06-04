import React, {useState, useContext} from 'react';
import { UserContext } from "./CTX/UserContext"
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";

import PersonalInformation from './PersonalInformation';
import SubscriptionDetails from './SubscriptionDetails';
import CurrentlySelectedBrands from './CurrentlySelectedBrands';
import FavouriteItemTracker from './FavouriteItemTracker';
import WhizzleProPricingAndFeatures from './WhizzleProPricingAndFeatures';
import Unsubscribe from './Unsubscribe';
import { getAuth, signOut , isSignInWithEmailLink ,signInWithEmailLink  } from "firebase/auth"; // Import the function

function UserDashboard() {
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState({})
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log('User signed out');
      setCurrentUser(null)
      navigate("/")
    } catch (error) {
      console.error('Error signing out', error);
    }
  };


  // update the data from the user
  return (
      <div className="dashboard">
        <div className="menu">
          <NavLink to="/dashboard" activeClassName="active">Personal Information</NavLink>
          <NavLink to="subscription-details" activeClassName="active">Subscription Details</NavLink>
          <NavLink to="currently-selected-brands" activeClassName="active">Selected Brands</NavLink>
          <NavLink to="favourite-item-tracker" activeClassName="active">Favourite Items</NavLink>
          <NavLink to="whizzle-pro-pricing-and-features" activeClassName="active">Whizzle Pro</NavLink>
          <NavLink to="unsubscribe" activeClassName="active">Unsubscribe</NavLink>
          <div  onClick = {() => {handleLogOut()}}>
            <button style = {{
              backgroundColor : "red",
              borderRadius : "3px", 
              borderBlockColor : "black",
              color : "white" }} >
            Log out
              </button>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<PersonalInformation/>} />
            <Route path="subscription-details" element={<SubscriptionDetails userId={userId}  userData={userData} />} />
            <Route path="currently-selected-brands" element={<CurrentlySelectedBrands />} />
            <Route path="favourite-item-tracker" element={<FavouriteItemTracker userId={userId} userData={userData} />} />
            <Route path="whizzle-pro-pricing-and-features" element={<WhizzleProPricingAndFeatures userId={userId}  userData={userData} />} />
            <Route path="unsubscribe" element={<Unsubscribe userId={userId} userData={userData} />} />
          </Routes>
        </div>
      </div>
  );
}

export default UserDashboard;
