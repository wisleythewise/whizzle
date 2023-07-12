import React, { useEffect, useState } from 'react';
import CountImg from '../assets/img/counts-img.svg';

// Counter Component
const Counter = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
        let current = start;

        const timer = setInterval(() => {
            current++;
            setCount(current);
            if (current >= end) {
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer); // This will clear Interval while un-mounting the component
    }, [start, end, duration]);

    return <span className="purecounter">{count}</span>;
};

const Counts = () => {
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
                                        <Counter start={0} end={128} duration={1} />
                                        <p><strong>Slimme Shoppers</strong>    gingen jou al voor</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-bag-heart"></i>
                                        <Counter start={0} end={85} duration={1} />
                                        <p><strong>Het aantal kledingmerken</strong> dat wij 24/7 voor jou in de gaten houden</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-percent"></i>
                                        <Counter start={0} end={20} duration={1} />
                                        <p><strong>Korting</strong> dat wij gemiddeld aan onze klanten aankaarten</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-award"></i>
                                        <Counter start={0} end={15} duration={1} />
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
