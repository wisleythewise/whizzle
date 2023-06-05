// Hero.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import headerImage from "../assets/img/hero-img.png" 
const Hero = () => {

  useEffect(() => {
    AOS.init({
      duration : 2000 // duration of the animations in milliseconds
    });
  }, []);

  return (
    <section id="hero" className="d-flex align-items-center">

    <div className="container">
      <div className="row">
        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">Never miss the sale of your favourite brands again!</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">With Whizzle you can select all your favourite brands and get notified whenever there is a sale or a discount code</h2>
          <div data-aos="fade-up" data-aos-delay="800">
            <a href="#howitworks" className="btn-get-started scrollto">Get Started</a>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
          <img src={headerImage} className="img-fluid animated" alt=""></img>
        </div>
      </div>
    </div>

  </section>
    
  );
};

export default Hero;