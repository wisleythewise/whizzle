import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false); 

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleDropdownToggle = (event) => {
    event.preventDefault();
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (headerScrolled !== show) {
        setHeaderScrolled(show);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };


  }, [headerScrolled]);

  return (
    <header id="header" className={`fixed-top d-flex align-items-center ${headerScrolled ? 'header-scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">

        <div className="logo">
          <a href="/"><img src={whistleLogo} alt="" className="img-fluid" /></a>
        </div>

        <nav id="navbar" className={navbarOpen ? "navbar navbar-mobile" : "navbar"}>
          <ul>
            <li>
              <Link 
                activeClass="active"
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={200}
                className="nav-link scrollto"
              >
                Home
              </Link>
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
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a className="nav-link scrollto" href="/login2">Login</a>
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
              >
                Get Started!
              </Link>
            </li>
          </ul>
          <i className={navbarOpen ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle"} onClick={handleNavbarToggle}></i>
        </nav>

      </div>
    </header>
  );
};

export default Header;
