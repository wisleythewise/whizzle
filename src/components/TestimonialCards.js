// HowItWorks.js
import React , { useEffect }  from 'react';

const TestimonialCards = (props) => {
  
    const url = props.url
    const quote = props.quote
    const name = props.name

  return (        
    <div classNameName="testimonial">
          <img src={url} alt="User 2" className="user-photo"></img>
          <blockquote className="user-quote">{quote}</blockquote>
          <cite className="user-name">{name}</cite>
          <div className="rating"></div>
      </div>
  );
};

export default TestimonialCards;