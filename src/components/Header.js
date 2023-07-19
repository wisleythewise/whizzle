import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect, useContext } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Renamed to avoid naming conflict
import { Link, useLocation , NavLink, useNavigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Import Link for page navigation
import { getAuth, signOut , isSignInWithEmailLink ,signInWithEmailLink  } from "firebase/auth"; // Import the function
import CurrentlySelectedBrands from './dashboard/CurrentlySelectedBrands';
import DashboardSettings from './dashboard/DashboardSettings';

// Importing the user
import { UserContext } from "./CTX/UserContext"  


const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation(); // Use the useLocation hook
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState({})
  const navigate = useNavigate();


  useEffect(() => {

  }, [currentUser])



  const handleNavbarToggle = (event) => {
    if (event) {
      event.preventDefault();
    }
    setNavbarOpen(!navbarOpen);
  };

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
  

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY >70;
      if (headerScrolled !== show) {
        setHeaderScrolled(show);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [headerScrolled]);


  const conditionalRenderHeader = () => {

    	if (location.pathname === '/login'){
        return true
      } else if (location.pathname === '/passwordforgotten'){
        return true
      } else if (location.pathname === '/passwordreset'){
        return true
      }else if (location.pathname === '/signin'){
        return true
      } else{
        return false
      }
  }

  const dashboardRender = () => {

    if (location.pathname === '/dashboard'){
      return true
    } else if (location.pathname === '/dashboard/settings'){
      return true
    } else{
      return false
    }
}


  return (
    <header id="header" className={`fixed-top d-flex align-items-center ${headerScrolled ? 'header-scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <a href="/"><img src={whistleLogo} alt="" className="img-fluid" /></a>
        </div>

        <nav id="navbar" className={navbarOpen && isMobile ? "navbar navbar-mobile" : "navbar"}>
          <ul>
          { conditionalRenderHeader() && (
              <li>
                <a href="/" className="nav-link scrollto">Terug</a>
              </li>   
            )}

            {/* Conditionally render the rest of the links only when not on /login page */}
            { !conditionalRenderHeader() && (
              <>
                <li>
                  <ScrollLink
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Wat is Whizzle
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    activeClass="active"
                    to="howitworks"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Hoe het werkt
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    activeClass="active"
                    to="faq"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Veelgestelde vragen
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    activeClass="active"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Contact
                  </ScrollLink>
                </li>
                <li>
                {currentUser ? 
                  (<Link
                    to="/dashboard"
                    className="getstarted scrollto"
                  >
                    Dashboard
                  </Link>) 
                  : (<Link
                    to="/login"
                    className="nav-link scrollto"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    Inloggen
                  </Link>)}

                </li>
                {!currentUser && 
                <li>
                  <ScrollLink
                    activeClass="active"
                    to="featuredbrands"
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={200}
                    className="getstarted scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Aan de slag!
                  </ScrollLink>
                </li>}

                {dashboardRender() && isMobile ? (
  <>
    <li>
      <NavLink onClick={() => handleNavbarToggle()} to="/dashboard" activeClassName="active">Your Brands<i class="bi bi-bag-heart dashboardicon"></i></NavLink>
    </li>
    <li>
      <NavLink onClick={() => handleNavbarToggle()} to="/dashboard/settings" activeClassName="active">Settings<i class="bi bi-person-gear dashboardicon"></i></NavLink>
    </li>
    <li>
      <NavLink  to="/" activeClassName="active" onClick={(event) => handleLogOut(event)}>
        Log Out<i className="bi bi-door-closed dashboardicon"></i>
      </NavLink>
    </li>

    <div>
          <div className="content">
            <Routes>
              <Route path="/" element={<CurrentlySelectedBrands/>} />
              <Route path="settings" element={<DashboardSettings userId={userId}  userData={userData} />} />
            </Routes>
          </div>
          </div>
  </>
) : "" }
              </>
            )}
          </ul>
          <i className={navbarOpen ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle"} onClick={handleNavbarToggle}></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
