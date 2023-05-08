// Footer.js
import React , { useEffect }  from 'react';
import Facebook from "../designs/facebook.png"
import Twitter from "../designs/twitter.png"
import Instagram from "../designs/instagram.png"
import Logo from "../designs/whistleiconv2.png"

const Footer = (props) => {
  return (        
  <footer className="footer">
      <div className="footer-logo">
          <img src={Logo} alt="Your Web App Logo" className="footer-logo-img"></img>
      </div>
      <div className="footer-links">
          <a href="#" className="footer-link">About Us</a>
          |
          <a href="#" className="footer-link">Contact Us</a>
          |
          <a href="#" className="footer-link">Privacy Policy  </a>
      </div>
      <div className="footer-social">
          <a href="#" className="social-icon"><img src={Facebook} alt="Facebook"></img></a>
          <a href="#" className="social-icon"><img src={Twitter} alt="Twitter"></img></a>
          <a href="#" className="social-icon"><img src={Instagram} alt="Instagram"></img></a>
      </div>
  </footer>
  );
};

export default Footer;