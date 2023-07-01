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
          <h2><span>Hoe het werkt</span></h2>
          <p><strong>Betaal nooit meer de volle prijs -</strong> bespaar moeiteloos geld met de aanpasbare sale alerts van Whizzle.  </p>
        </div>

        <div className="howitworks-container">

        <div className="howitworks-card" onClick={() => handleToggleDescription(0)}>            
          <div className="icon-box" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
              <div className="icon"><i className="bi bi-check2-square"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">1</p></div>               
              <div className='howitworks-text'>
              <h4 className="title">Selecteer merken</h4> 
              <p className={`description ${showDescriptionIndex === 0 ? 'show' : ''}`}>Selecteer je favoriete merken en webshops.</p>              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(1)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200" data-aos-offset="80">
              <div className="icon"><i className="bi bi-envelope-at"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">2</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Abonneer met je email</h4>
                <p className={`description ${showDescriptionIndex === 1 ? 'show' : ''}`}>Jij hebt de controle, kies de gewenste frequentie voor de beste online winkelervaring.</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(2)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300" data-aos-offset="60">
              <div className="icon"><i className="bi bi-search-heart"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">3</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Geautomatiseerde scanners</h4>
                <p className={`description ${showDescriptionIndex === 2 ? 'show' : ''}`}>Onze geautomatiseerde systemen controleren continu je webshops om sale te detecteren.</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(3)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400" data-aos-offset="60">
              <div className="icon"><i className="bi bi-chat-right-heart"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">4</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Gepersonaliseerde notificaties</h4>
                <p className={`description ${showDescriptionIndex === 3 ? 'show' : ''}`}>Ontvang alleen de sale alerts die jij wil, stressvrij.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      </section>
  );
};

export default HowItWorks;