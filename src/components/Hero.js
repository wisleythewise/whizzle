// Hero.js
import React, { useEffect } from 'react';

import whistleLogo from "../designs/whistleiconv2.png";

const Hero = () => {

  const heightOfHeroElement = document.getElementsByClassName("hero")


  const scrollToHowItWorks = () => {
    const position = heightOfHeroElement[0].offsetHeight 
    window.scrollTo(
      {
      top : position,
      behaviour : "smooth" 
    })
    
    return
  }

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="headline">
            Always buy your favourite items on a discount
        </h1>
        <h2 className="subheadline">
            Select your favourite brands or webshops and we will notify you whenever there is a sale!
        </h2>
        <div className="video-container">
             <video src="your-video.mp4" autoplay muted loop></video> 
        </div>
        <button className="cta-button" id="scrollToBrands" onClick ={scrollToHowItWorks}>Let's get started!</button>
      </div>    

      </div>
    
  );
};

export default Hero;