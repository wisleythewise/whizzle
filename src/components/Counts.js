
import CountImg from '../assets/img/counts-img.svg';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);
    const [ref, inView] = useInView({
      triggerOnce: true, // Change this to false if you want the animation to restart whenever it comes in view
    });

    useEffect(() => {
        if (inView) { // Only start counting when the component is in view
            const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
            let current = start;
            let timer;

            const delayedStart = setTimeout(() => {
                timer = setInterval(() => {
                    current++;
                    setCount(current);
                    if (current >= end) {
                        clearInterval(timer);
                    }
                }, stepTime);
            }, 1000); // delay start by 1 second

            return () => {
                clearTimeout(delayedStart); // Clear timeout if component unmounts before delay finishes
                clearInterval(timer); // This will clear Interval while un-mounting the component
            };
        }
    }, [start, end, duration, inView]); // Depend on inView

    return <span ref={ref} className="purecounter">{count}</span>; // Add ref here
};


const Counts = () => {
    return (
        <section id="counts" className="counts">
            <div className="container">

                <div className="row">
                    <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150" data-aos-offset="30">
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
                                        <p><strong>Kledingmerken</strong> houden wij 24/7 voor jou in de gaten</p>
                                    </div>
                                </div>

                                <div className="col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="bi bi-percent"></i>
                                        <Counter start={0} end={20} duration={1} />
                                        <p><strong> % Korting</strong> bezorgen wij gemiddeld bij onze klanten.</p>
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
