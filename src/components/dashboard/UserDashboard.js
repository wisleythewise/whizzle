import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from "../CTX/UserContext"  
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";

import PersonalInformation from './PersonalInformation';
import DashboardSettings from './DashboardSettings';
import CurrentlySelectedBrands from './CurrentlySelectedBrands';
import FavouriteItemTracker from './FavouriteItemTracker';
import WhizzleProPricingAndFeatures from './WhizzleProPricingAndFeatures';
import Unsubscribe from './Unsubscribe';
import { getAuth, signOut , isSignInWithEmailLink ,signInWithEmailLink  } from "firebase/auth"; // Import the function

function UserDashboard() {
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState({})
  const [selectedTab, setSelectedTab] = useState("")
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [navbarOpen, setNavbarOpen] = useState(false);


  const handleLogOut = async (event) => {
    try {
      // Prevent default navigation
      event.preventDefault();
      
      const auth = getAuth();
      await signOut(auth);
      console.log('User signed out');
      setCurrentUser(null)
      navigate("/");
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

    setSelectedTab("dashboard")
  }, []);

  const handleNavbarToggle = (event) => {
    if (event) {
      event.preventDefault();
    }
    setNavbarOpen(!navbarOpen);
  };
  // update the data from the user
  return (
    <div>


      <div className="dashboard">
        <div className='dashboard-container mx-auto' style = {isMobile ? {padding : "0px"} : {}}>
          <div className="menu" style = {isMobile ? {padding : "0px" , width : "0px" , flex : "0" , visibility : "hidden"} : {} }>
            
            <NavLink to="/dashboard" activeClassName="active">Your Brands<i class="bi bi-bag-heart dashboardicon"></i></NavLink>
            <NavLink to="settings" activeClassName="active">Settings<i class="bi bi-person-gear dashboardicon"></i></NavLink>
            <NavLink to="/" activeClassName="active" onClick={(event) => handleLogOut(event)}>
              Log Out<i className="bi bi-door-closed dashboardicon"></i>
          </NavLink>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<CurrentlySelectedBrands/>} />
              <Route path="settings" element={<DashboardSettings userId={userId}  userData={userData} />} />
            </Routes>
          </div>
          </div>
      </div>


  </div>

  );
}

export default UserDashboard;

