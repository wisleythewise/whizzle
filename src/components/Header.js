import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false); // Added this state

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
    <header id="header" className={`fixed-top d-flex align-items-center ${headerScrolled ? 'header-scrolled' : ''}`}>      <div className="container d-flex align-items-center justify-content-between">

      <div class="logo">        
        <a href="index.html"><img src={whistleLogo} alt="" class="img-fluid"></img></a>
      </div>

        <nav id="navbar" className={navbarOpen ? "navbar navbar-mobile" : "navbar"}>
          <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#howitworks">How It Works</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact Us</a></li>
          <li><a class="nav-link scrollto" href="/login">Login</a></li>
          <li><a class="getstarted scrollto" href="#featuredbrands">Get Started!</a></li>

          {/* <li><a class="nav-link scrollto" href="#services">Services</a></li>
          <li><a class="nav-link scrollto " href="#featuredbrands">featuredbrands</a></li>
          <li><a class="nav-link scrollto" href="#team">Team</a></li>
          <li><a class="nav-link scrollto" href="#pricing">Pricing</a></li> */}
            
            {/* <li className="dropdown">
              <a href="#" onClick={handleDropdownToggle}>
                <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
              </a>
              <ul className={dropdownActive ? "dropdown-active" : ""}>
              {/* <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li> */}
              {/*</ul>
            </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li> */}
          </ul>
          <i className={navbarOpen ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle"} onClick={handleNavbarToggle}></i>
        </nav>

      </div>
    </header>
  );
};

export default Header;