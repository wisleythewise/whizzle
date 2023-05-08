// Header.js
import React from 'react';

import whistleLogo from "../designs/whistleiconv2.png";

const Header = () => {
  return (
    <header className="main-header"> 
    <div className="logo-container">
      <img src={whistleLogo} alt="Your Web App Logo" className="logo"></img>
  </div>
  <nav className="main-nav">
      <a href="#get-started" className="nav-link">Get Started</a>
      <span className="nav-separator">|</span>
      <a href="#how-it-works" className="nav-link">How Does It Work</a>
      <span className="nav-separator">|</span>
      <a href="#contact" className="nav-link">Contact</a>
    </nav>
    </header>
    
  );
};

export default Header;