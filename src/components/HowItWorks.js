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

        <div className="section-title" data-aos="fade-up" data-aos-offset="60">
          <h2><span>How It Works</span></h2>
          <p><strong>Never pay full price again -</strong> save money effortlessly with our customizable sale notifications & never worry about a cluttered mailbox  </p>
        </div>

        <div className="howitworks-container">

        <div className="howitworks-card" onClick={() => handleToggleDescription(0)}>            
          <div className="icon-box" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
              <div className="icon"><i className="bi bi-check2-square"></i></div>
              <div className='howitworks-text'>
              <h4 className="title">Select brands</h4>                
              <p className={`description ${showDescriptionIndex === 0 ? 'show' : ''}`}>Select your favorite brands and webshops</p>              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(1)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200" data-aos-offset="80">
              <div className="icon"><i className="bi bi-envelope-at"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Provide us with your email</h4>
                <p className={`description ${showDescriptionIndex === 1 ? 'show' : ''}`}>You are in control, selecte the desired frequency to create the best online shopping experience</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(2)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300" data-aos-offset="60">
              <div className="icon"><i className="bi bi-search-heart"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Automated Monitoring</h4>
                <p className={`description ${showDescriptionIndex === 2 ? 'show' : ''}`}>Our automated systems will continuously monitor your webshops to detect sales</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(3)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400" data-aos-offset="60">
              <div className="icon"><i className="bi bi-chat-right-heart"></i></div>
              <div className='howitworks-text'>
                <h4 className="title">Personalized Alerts</h4>
                <p className={`description ${showDescriptionIndex === 3 ? 'show' : ''}`}>Receive personalized sale alerts, stress free.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      </section>
  );
};

export default HowItWorks;