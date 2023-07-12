import React, { useEffect } from 'react';
import PureCounter from '../assets/vendor/purecounter/purecounter_vanilla.js';
import CountImg from '../assets/img/counts-img.svg';

const Counts = () => {

    useEffect(() => {
        new PureCounter();
    }, []);
    return (
        <section id="counts" className="counts">
            <div className="container">

                <div className="row">
                    <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150">
                        <img src={CountImg} alt="" className="img-fluid" />
                    </div>

                    <div className="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0" data-aos="fade-left" data-aos-delay="300">
                        <div className="content d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-emoji-smile"></i>
                                        <span data-purecounter-start="0" data-purecounter-end="128" data-purecounter-duration="1" className="purecounter"></span>
                                        <p><strong>Slimme Shoppers</strong>    gingen jou al voor</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-bag-heart"></i>
                                        <span data-purecounter-start="0" data-purecounter-end="85" data-purecounter-duration="1" className="purecounter"></span>
                                        <p><strong>Het aantal kledingmerken</strong> dat wij 24/7 voor jou in de gaten houden</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-percent"></i>
                                        <span data-purecounter-start="0" data-purecounter-end="20" data-purecounter-duration="1" className="purecounter"></span>
                                        <p><strong>Korting</strong> dat wij gemiddeld aan onze klanten aankaarten</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-award"></i>
                                        <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
                                        <p><strong>100</strong> rerum asperiores dolor alias quo reprehenderit eum et nemo pad der</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Counts;
