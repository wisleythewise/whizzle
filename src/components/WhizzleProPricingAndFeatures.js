import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

function WhizzleProPricingAndFeatures({ userData }) {

  useEffect(() => {
    AOS.init({
      duration : 2000 // duration of the animations in milliseconds
    });
  }, []);


  const proFeatures = () => {
    return (
      <section id="more-services" className="more-services">
        <div className="section-title" data-aos="fade-up">
          <h2>Advantages of Whizzle Pro</h2>
          <p>Pro users will get full acces to our AI driven tools and will never have to buy anything for the full price again!</p>
        </div>

        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="card" style={{ backgroundImage: 'url("../assets/img/more-services-1.jpg")' }} data-aos="fade-up" data-aos-delay="100">
              <div className="card-body">
                <h5 className="card-title"><a href="">Get alerts for specific items of your choosing!</a></h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua.</p>
                <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="card" style={{ backgroundImage: 'url("../assets/img/more-services-2.jpg")' }} data-aos="fade-up" data-aos-delay="200">
              <div className="card-body">
                <h5 className="card-title"><a href="">Add as many brands to your alert list as you like!</a></h5>
                <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem.</p>
                <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
              </div>
            </div>

          </div>
          <div className="col-md-6 d-flex align-items-stretch mt-4">
            <div className="card" style={{ backgroundImage: 'url("../assets/img/more-services-3.jpg")' }} data-aos="fade-up" data-aos-delay="100">
              <div className="card-body">
                <h5 className="card-title"><a href="">Custom user dashboard</a></h5>
                <p className="card-text">Easily change the brands and items on your alert list in your own user dashboard.</p>
                <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-stretch mt-4">
            <div className="card" style={{ backgroundImage: 'url("../assets/img/more-services-4.jpg")' }} data-aos="fade-up" data-aos-delay="200">
              <div className="card-body">
                <h5 className="card-title"><a href="">Acces to the Current Sales Table</a></h5>
                <p className="card-text">Get acces directly to an overview of all the brands that are currently having a sale.</p>
                <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
              </div>
            </div>
          </div>
        </div>
    </section>)
  }

  return userData.isProUser ? (
    <div>
      <h1>Whizzle Pro Pricing And Features</h1>
      <p>Pro User Status: {userData.isProUser ? 'Yes' : 'No'}</p>
    </div>
  ):  proFeatures();
}

export default WhizzleProPricingAndFeatures;
