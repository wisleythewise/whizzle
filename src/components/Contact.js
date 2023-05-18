// CTASection.js
import React , { useEffect, useState }  from 'react';
import FAQCard from "./FAQCard"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 


const Contact = (props) => {
  const [allCards, setAllCards] = useState([])
 

  return (        
<section id="contact" className="contact">
  <div className="container">

    <div className="section-title" data-aos="fade-up">
      <h2>Contact Us</h2>
    </div>

    <div className="row">

      <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="100">
        <div className="contact-about">
          <h3>Whizzle</h3>
          <p>Never pay fullprice</p>
          <div className="social-links">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className='col-lg-3'></div>

      <div className="col-lg-4 col-md-12 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
        <div className="info">
          <div>
            <i className="ri-map-pin-line"></i>
            <p>Marnixstraat 356-h<br></br>Amsterdam, 1016 HX</p>
          </div>

          <div>
            <i className="ri-mail-send-line"></i>
            <p>support@whizzle.ai</p>
          </div>

          <div>
            <i className="ri-phone-line"></i>
            <p>+31 642102838</p>
          </div>

        </div>
      </div>

    </div>

  </div>
</section>
  );
};

export default Contact;