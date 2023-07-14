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
          <p><strong>Betaal nooit meer de volle prijs</strong> </p>
          <p style={{marginTop: '10px'}}>Bespaar in 3 stappen moeiteloos geld met de gepersonaliseerde sale-alerts van Whizzle.  </p>
        </div>

        <div className="howitworks-container">

        <div className="howitworks-card" onClick={() => handleToggleDescription(0)}>            
          <div className="icon-box" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
              <div className="icon"><i className="bi bi-check2-square"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">1</p></div>               
              <div className='howitworks-text'>
              <h4 className="title">Selecteer je merken</h4> 
              <p className={`description ${showDescriptionIndex === 0 ? 'show' : ''}`}>Kies nu tot en met 10 merken die Whizzle voor jou in de gaten houdt!</p>              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(1)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200" data-aos-offset="80">
              <div className="icon"><i className="bi bi-envelope-at"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">2</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Vul je email in</h4>
                <p className={`description ${showDescriptionIndex === 1 ? 'show' : ''}`}>Ja dat is echt alles (wel nog even bevestigen in je mailbox).</p>
              </div>
            </div>
          </div>

          <div className="howitworks-card" onClick={() => handleToggleDescription(2)}>            
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300" data-aos-offset="60">
              <div className="icon"><i className="bi bi-search-heart"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">3</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Geniet van de kracht van Whizzle</h4>
                <p className={`description ${showDescriptionIndex === 2 ? 'show' : ''}`}>Vanaf nu ben je moeiteloos op de hoogte van relevante sales! </p>
              </div>
            </div>
          </div>

          {/* <div className="howitworks-card" onClick={() => handleToggleDescription(3)}>           
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400" data-aos-offset="60">
              <div className="icon"><i className="bi bi-chat-right-heart"></i></div>
              <div className='numbercontainer'><p className="howitworksnumber">4</p></div>               
              <div className='howitworks-text'>
                <h4 className="title">Gepersonaliseerde notificaties</h4>
                <p className={`description ${showDescriptionIndex === 3 ? 'show' : ''}`}>Onze geautomatiseerde systemen controleren continu je webshops om sale te detecteren.</p>
              </div>
            </div>
          </div> */}

        </div>

      </div>
      </section>
  );
};

export default HowItWorks;