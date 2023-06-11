// HowItWorks.js
import React, { useState } from 'react';

const HowItWorks = () => {
  const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

  const handleToggleDescription = (index) => {
    setShowDescriptionIndex(showDescriptionIndex === index ? null : index);
  };

  return (
    <section id="howitworks" className="services">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2><span>How It Works</span></h2>
          <p>Whizzle.AI is the perfect tool for people who want to save money on their favorite brands. In a few clicks you can subscribe to receive alerts whenever your favorite brand is having a sale</p>
        </div>

        <div className="howitworks-container">

        <div className="howitworks-card" onClick={() => handleToggleDescription(0)}>            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div className="icon"><i className="bx bxl-dribbble"></i></div>
              <div className='howitworks-text'>
              <h4 className="title">Select brands</h4>                
              <p className={`description ${showDescriptionIndex === 0 ? 'show' : ''}`}>Select your favorite brands on our brand selector page</p>              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(1)}>            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div className="icon"><i className="bx bx-file"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Enter your email</h4>
                <p className={`description ${showDescriptionIndex === 1 ? 'show' : ''}`}>In just one click you can provide us your email so we can send you the latest discount codes or sale alerts</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(2)}>            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div className="icon"><i className="bx bx-tachometer"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Automated Monitoring</h4>
                <p className={`description ${showDescriptionIndex === 2 ? 'show' : ''}`}>Our automated systems will continuously monitor the webshops of your faourite brands, in order to detect sales or discount codes</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(3)}>            <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
              <div className="icon"><i className="bx bx-world"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Personalized Alerts</h4>
                <p className={`description ${showDescriptionIndex === 3 ? 'show' : ''}`}>The Whizzle.AI team will provide you with personalized alerts in your inbox, containing sale announcements or discount codes!</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      </section>
  );
};

export default HowItWorks;