import whistleLogo from "../designs/logo.png";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "./CTX/UserContext";

const Header = () => {
  const {currentUser, setCurrentUser}= useContext(UserContext)
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust the value 768 to the breakpoint you desire
  
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
      setIsMobile(window.innerWidth < 768); // Again, adjust the value 768 to the breakpoint you desire
    };

    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };


  }, [headerScrolled]);

  return (
    <header id="header" className={`fixed-top d-flex align-items-center ${headerScrolled ? 'header-scrolled' : ''}`}>      <div className="container d-flex align-items-center justify-content-between">

      <div class="logo">        
        <a href="/"><img src={whistleLogo} alt="" class="img-fluid"></img></a>
      </div>

        <nav id="navbar" className={navbarOpen && isMobile ? "navbar navbar-mobile" : "navbar"}>
          <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#howitworks">How It Works</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact Us</a></li>
          {currentUser ? <li><a class="nav-link scrollto" href="/dashboard">Dashboard</a></li> : <li><a class="nav-link scrollto" href="/login">Login</a></li>  }
          <li><a class="getstarted scrollto" href="#featuredbrands">Get Started!</a></li>

          </ul>
          <i className={navbarOpen ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle"} onClick={handleNavbarToggle}></i>
        </nav>

      </div>
    </header>
  );
};

export default Header;