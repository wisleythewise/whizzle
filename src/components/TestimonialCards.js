// HowItWorks.js
import React , { useEffect }  from 'react';

const TestimonialCards = (props) => {
  
    const url = props.url
    const quote = props.quote
    const name = props.name

  return ( 
    
    <div className="swiper-slide">
    <div className="testimonial-wrap">
      <div className="testimonial-item">
        <img src={url} className="testimonial-img" alt=""></img>
        <h3>{name}</h3>
        <p>
          <i className="bx bxs-quote-alt-left quote-icon-left"></i>
          {quote}
          <i className="bx bxs-quote-alt-right quote-icon-right"></i>
        </p>
      </div>
    </div>
  </div>

  );
};

export default TestimonialCards;