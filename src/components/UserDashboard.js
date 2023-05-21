import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import PersonalInformation from './PersonalInformation';
import SubscriptionDetails from './SubscriptionDetails';
import CurrentlySelectedBrands from './CurrentlySelectedBrands';
import FavouriteItemTracker from './FavouriteItemTracker';
import WhizzleProPricingAndFeatures from './WhizzleProPricingAndFeatures';
import Unsubscribe from './Unsubscribe';
import LogOut from './LogOut';
import { auth } from '../firebaseConfig';

import { isSignInWithEmailLink ,signInWithEmailLink  } from "firebase/auth"; // Import the function
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function UserDashboard() {
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState({})


  useEffect(() => {

    let email = window.localStorage.getItem('emailForSignIn');

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!email) {
        // Ask user for their email for confirmation
        email = window.prompt('Please provide your email for confirmation');
        window.localStorage.setItem('emailForSignIn', email);
        fetchData(email)
      }
      
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
        });
    }
    
    const fetchData = async (email) => {
      console.log("This is the email")
      console.log(email)
      const userCollection = collection(db, 'Users');
      const userSnapshot = await getDocs(userCollection);

      const userData = userSnapshot.docs.map((doc) => {
        const docData = doc.data();

        if( docData.email = email){

          const userDataRetrieved = {
            email: docData.email,
            brands : docData.brands
          }
          setUserData(userDataRetrieved)
          setUserId(doc.id)
          return

        } 

      }); 
    }

    fetchData(email)

  },[])


  // Get the data from the user
  console.log("this is the user data")
  console.log(userData)
  console.log(userId)

  // update the data from the user
  return (
      <div className="dashboard">
        <div className="menu">
          <NavLink to="personal-information" activeClassName="active">Personal Information</NavLink>
          <NavLink to="subscription-details" activeClassName="active">Subscription Details</NavLink>
          <NavLink to="currently-selected-brands" activeClassName="active">Selected Brands</NavLink>
          <NavLink to="favourite-item-tracker" activeClassName="active">Favourite Items</NavLink>
          <NavLink to="whizzle-pro-pricing-and-features" activeClassName="active">Whizzle Pro</NavLink>
          <NavLink to="unsubscribe" activeClassName="active">Unsubscribe</NavLink>
          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="personal-information" element={<PersonalInformation userId={userId} userData={userData} />} />
            <Route path="subscription-details" element={<SubscriptionDetails userId={userId}  userData={userData} />} />
            <Route path="currently-selected-brands" element={<CurrentlySelectedBrands userId={userId} userData={userData} />} />
            <Route path="favourite-item-tracker" element={<FavouriteItemTracker userId={userId} userData={userData} />} />
            <Route path="whizzle-pro-pricing-and-features" element={<WhizzleProPricingAndFeatures userId={userId}  userData={userData} />} />
            <Route path="unsubscribe" element={<Unsubscribe userId={userId} userData={userData} />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </div>
      </div>
  );
}

export default UserDashboard;
