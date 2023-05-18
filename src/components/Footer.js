// Footer.js
import React , { useEffect }  from 'react';
import Facebook from "../designs/facebook.png"
import Twitter from "../designs/twitter.png"
import Instagram from "../designs/instagram.png"
import Logo from "../designs/whistleiconv2.png"

const Footer = (props) => {
  return (        
    <footer id="footer">
    <div className="container">
      <div className="row d-flex align-items-center">
        <div className="col-lg-6 text-lg-left text-center">
          <div className="copyright">
            &copy; Copyright <strong>Whizzle</strong>. All Rights Reserved
          </div>
          
        </div>
        <div className="col-lg-6">
          <nav className="footer-links text-lg-right text-center pt-2 pt-lg-0">
            <a href="#intro" className="scrollto">Home</a>
            <a href="#about" className="scrollto">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;