import React, {useState, useContext, useEffect} from 'react';
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
      // hier nog een "weet je het zeker" melding toevoegen
      const auth = getAuth();
      await signOut(auth);
      console.log('User signed out');
      setCurrentUser(null)
      navigate("/")
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // header transparant maken
  useEffect(() => {
    const header = document.querySelector("header");

    if (header) {
      const currentBackgroundColor = header.style.backgroundColor;
      header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
      return () => {
        header.style.backgroundColor = currentBackgroundColor;
      };
    }
  }, []);

  // update the data from the user
  return (
      <div className="dashboard">
        <div className="menu">
          <NavLink to="/dashboard" activeClassName="active">Your Brands<i class="bi bi-bag-heart dashboardicon"></i></NavLink>
          <NavLink to="settings" activeClassName="active">Settings<i class="bi bi-person-gear dashboardicon"></i></NavLink>
          <NavLink to="/" activeClassName="active">Log Out<i onClick = {() => {handleLogOut()}} class="bi bi-door-closed dashboardicon"></i></NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<CurrentlySelectedBrands/>} />
            <Route path="settings" element={<SubscriptionDetails userId={userId}  userData={userData} />} />
          </Routes>
        </div>
      </div>
  );
}

export default UserDashboard;


  {/* <Route path="currently-selected-brands" element={<CurrentlySelectedBrands />} /> */}
  {/* <Route path="favourite-item-tracker" element={<FavouriteItemTracker userId={userId} userData={userData} />} />
  <Route path="whizzle-pro-pricing-and-features" element={<WhizzleProPricingAndFeatures userId={userId}  userData={userData} />} />
  <Route path="unsubscribe" element={<Unsubscribe userId={userId} userData={userData} />} /> */}
            {/* <NavLink to="currently-selected-brands" activeClassName="active">Selected Brands</NavLink>
<NavLink to="favourite-item-tracker" activeClassName="active">Favourite Items</NavLink>
<NavLink to="whizzle-pro-pricing-and-features" activeClassName="active">Whizzle Pro</NavLink> */}
{/* <NavLink to="unsubscribe" activeClassName="active"><i class="bi bi-door-closed"></i></NavLink> */}