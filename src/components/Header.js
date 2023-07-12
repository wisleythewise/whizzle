import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect, useContext } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Renamed to avoid naming conflict
import { Link, useLocation } from 'react-router-dom'; // Import Link for page navigation

// Importing the user
import { UserContext } from "./CTX/UserContext"  


const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation(); // Use the useLocation hook

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {

  }, [currentUser])



  const handleNavbarToggle = (event) => {
    if (event) {
      event.preventDefault();
    }
    setNavbarOpen(!navbarOpen);
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
                  <a href="/" className="nav-link scrollto">Home</a>
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
                    className="nav-link scrollto"
                  >
                    Dashboard
                  </Link>) 
                  : (<Link
                    to="/login"
                    className="nav-link scrollto"
                  >
                    Inloggen
                  </Link>) 
}

                </li>
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
                </li>
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
