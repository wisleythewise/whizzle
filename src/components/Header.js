import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const location = useLocation(); // Use the useLocation hook
  
  const handleNavbarToggle = (event) => {
    if (event) {
      event.preventDefault();
    }
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
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

  return (
    <header id="header" className={`fixed-top d-flex align-items-center ${headerScrolled ? 'header-scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <a href="/"><img src={whistleLogo} alt="" className="img-fluid" /></a>
        </div>

        <nav id="navbar" className={navbarOpen && isMobile ? "navbar navbar-mobile" : "navbar"}>
          <ul>
          {location.pathname == '/login' && (
              <>
          <li>
            <a
              href="/"
              className="nav-link scrollto"
              >
              Go Back
            </a>
          </li>   
              </>
            )}

            {/* Conditionally render the rest of the links only when not on /login page */}
            {location.pathname !== '/login' && (
              <>
                <li>
                  <a
                    href="/"
                    className="nav-link scrollto"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="howitworks"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="faq"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={200}
                    className="nav-link scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="/login"
                    className="nav-link scrollto"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="featuredbrands"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={200}
                    className="getstarted scrollto"
                    onClick={handleNavbarToggle}
                  >
                    Get Started!
                  </Link>
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
