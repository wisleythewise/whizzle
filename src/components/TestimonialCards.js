// HowItWorks.js
import React , { useEffect, useState }  from 'react';

const TestimonialCards = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  
    const url = props.url
    const quote = props.quote
    const name = props.name

  return ( 
    
    <div className="swiper-slide">
    <div className="testimonial-wrap">
      <div className="testimonial-item">
      {isMobile ?<></> : <img src={url} className="testimonial-img" alt=""></img>}
        <p>
          <i className="bx bxs-quote-alt-left quote-icon-left"></i>
          {quote}
          <i className="bx bxs-quote-alt-right quote-icon-right"></i>
        </p>
        <h3>{name}</h3>
      </div>
    </div>
  </div>

  );
};

export default TestimonialCards;