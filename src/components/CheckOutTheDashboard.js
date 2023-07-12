// FeaturedBrands.js
import React , { useState, useEffect }  from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CheckOutTheDashboard = () => {


  return (
  <section id="featuredbrands" className="featuredbrands">
    <div className="container">

      <div className="section-title" data-aos="fade-up">
        <h2><span>Verander jouw gekozen merken</span></h2>
        <p>Ga naar jouw persoonlijke dashboard om je geselecteerde merken te wijzigen</p>
        <a className='dashboard-button' href='/dashboard'>Dashboard</a>
      </div>

      </div>
  </section>

  );
};

export default CheckOutTheDashboard;