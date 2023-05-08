// HowItWorks.js
import React , { useEffect }  from 'react';

import pict1 from "../designs/pict1.png"
import pict2 from "../designs/pict2.png"
import pict3 from "../designs/pict3.png"

const HowItWorks = () => {
  
  
  useEffect(() => {
    // Select the element with the class 'step'
    const stepElements = document.querySelectorAll(".step");

    // Change the opacity property after a short delay (e.g., 100ms)
    setTimeout(function () {
      stepElements.forEach((stepElement) => {
        stepElement.style.opacity = 1;
      } )
      
    }, 100);
  }, []);

  
  window.addEventListener("load", function () {
    // Select the element with the class 'step'
    const stepElement = document.querySelector(".step");
  
    // Change the opacity property after a short delay (e.g., 1 second)
    setTimeout(function () {
      stepElement.style.opacity = 0.1;
    }, 100);
  });

  return (
    <section className="how-it-works" id="how-it-works-section">
    <h2 className="how-it-works-header">How It Works</h2>
    <div className="step">
        <div className="step-icon"><img src={pict1} alt="step 1" className="step-icon" data-brand="step1"></img></div>
        <h3 className="step-title">Choose Your Brands</h3>
        <p className="step-description">Select your favorite brands to personalize your experience.</p>
    </div>
    <div className="step">
        <div className="step-icon"><img src={pict2} alt="step 1" className="step-icon" data-brand="step2"></img></div>
        <h3 className="step-title">Subscribe for Alerts</h3>
        <p className="step-description">Receive discount codes and sale alerts directly in your inbox.</p>
    </div>
    <div className="step">
        <div className="step-icon"><img src={pict3} alt="step 1" className="step-icon" data-brand="step3"></img></div>
        <h3 className="step-title">Shop & Save</h3>
        <p className="step-description">Enjoy exclusive discounts and never miss a sale from your favorite brands.</p>
    </div>
  </section>

  );
};

export default HowItWorks;