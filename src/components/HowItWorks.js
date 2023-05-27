// HowItWorks.js
import React , { useEffect }  from 'react';
import HowItWorksCard from "./HowItWorksCard";

import pict1 from "../designs/pict1.png"
import pict2 from "../designs/pict2.png"
import pict3 from "../designs/pict3.png"

const HowItWorks = () => {



  return (
    <section id="howitworks" className="services">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>How does it work?</h2>
          <p>Whizzle.AI is the perfect tool for people who want to save money on their favourite brands. In a few clicks you can subscribe to receive alerts whenever your favourite brand is having a sale</p>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div className="icon"><i className="bx bxl-dribbble"></i></div>
              <h4 className="title"><a href="">1. Select brands</a></h4>
              <p className="description">Select your favourite brands on our brand selector page              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div className="icon"><i className="bx bx-file"></i></div>
              <h4 className="title"><a href="">2. Enter your email</a></h4>
              <p className="description">In just one click you can provide us your email so we can send you the latest discount codes or sale alerts</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div className="icon"><i className="bx bx-tachometer"></i></div>
              <h4 className="title"><a href="">3. Automated Monitoring</a></h4>
              <p className="description">Our automated systems will continuously monitor the webshops of your faourite brands, in order to detect sales or discount codes</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
              <div className="icon"><i className="bx bx-world"></i></div>
              <h4 className="title"><a href="">4. Personalized Alerts</a></h4>
              <p className="description">The Whizzle.AI team will provide you with personalized alerts in your inbox, containing sale announcements or discount codes!</p>
            </div>
          </div>

        </div>

      </div>
      </section>
  );
};

export default HowItWorks;