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
            Are you annoyed by the number of newsletters overcrowding your inbox? <br></br>
            We are too.
        </h1>
        <h2 className="subheadline">
          From now on:    <span className="highlight">Only </span> <span className="highlight">Relevant </span> <span className="highlight">Newsletters. </span>
        </h2>
       <p className="description">
            Want to know when your favorite brands or webstore are on sale and nothing else? No problem. <br></br>
            Want to know when your favorite designer releases new products? We can do that too.  <br></br>
            <br></br>
            From now on, you can receive just the newsletters you are interested in. Never be annoyed again.
        </p> 
        <button className="cta-button" id="scrollToBrands" onClick ={scrollToHowItWorks}>Let's get started!</button>
      </div>    
        <div className="video-container">
             <video src="your-video.mp4" autoplay muted loop></video> 
        </div>
      </div>
    
  );
};

export default Hero;