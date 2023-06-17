// Hero.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import heroimage from "../assets/img/hero-img.png" 
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
          <h1 data-aos="fade-up">Stop searching for deals, let Whizzle do the work for you!</h1>
          <h2 data-aos="fade-up" data-aos-delay="200">Save time and money with Whizzle's personalized sale alerts.</h2>
          <div data-aos="fade-up" data-aos-delay="300">
            <a href="#featuredbrands" className="btn-get-started scrollto" data-aos-offset="80">Get Started</a>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
          <img src={heroimage} className="img-fluid animated" alt=""></img>
        </div>
        <div className='col-lg-6 order-1 order-lg-2' data-aos='fade-up' data-aos-delay='300'>
          {/* classname is temp moet nog aangepast worden */}
          {/* hier de testimonials plaatsen. Chatgpt vragen om deze class te maken zodat het klopt met de andere items. Voor mobile moet het 3 rijen onder elkaar zijn. Voor desktop testimonials rij onder de andere dingen */}
          </div>
      </div>
    </div>

  </section>
    
  );
};

export default Hero;