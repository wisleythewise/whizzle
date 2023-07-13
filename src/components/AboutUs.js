const AboutUs = () => {
    return (
        <section id="about" className="about" >
            <div className="container">

                <div className="section-title" data-aos="fade-up" data-aos-offset="10">
                    <h2><span>Wat doet Whizzle</span></h2>
                </div>

                <div className="row content">

                    <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay="150" data-aos-offset="30">
                    <p>
                        Wil jij op de hoogte zijn van wanneer jouw favoriete merken sale hebben zonder dat je inbox overspoeld wordt met marketing mailtjes?
                        </p>
                        <p><strong>Gebruik dan nu Whizzle!</strong></p>
                        <p>
                        Whizzle is een tool die ervoor zorgt dat jij altijd als eerste op de hoogte bent als er online sale is bij jouw favoriete merken.

                        Aanmelden kost 1 minuut! 
                        </p>

                    </div>
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="150" data-aos-offset="30">
                        <ul>
                            <li><i className="ri-check-double-line"></i>Verminder het aantal nieuwsbrieven en promotiemails in je inbox.</li>
                            <li><i className="ri-check-double-line"></i>Bespaar tijd door nooit meer te hoeven zoeken naar wanneer jouw merk sale heeft.</li>
                            <li><i className="ri-check-double-line"></i>Bespaar geld door nooit meer iets voor de volle prijs te kopen.</li>
                            <li><i className="ri-check-double-line"></i>Aanmelden is helemaal gratis!</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div>
                    <a href="#featuredbrands" className="btn-learn-more"data-aos="fade-up" data-aos-delay="150" data-aos-offset="30">Aan de slag!</a>
                    </div>
                </div>

            </div>
        </section>
        
    );
};

export default AboutUs;
