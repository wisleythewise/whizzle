import React, { useState, useEffect } from 'react';
import TestimonialCards from "./TestimonialCards";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import AOS from 'aos';
import 'aos/dist/aos.css';

import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

// install Swiper's Autoplay module
SwiperCore.use([Autoplay, Pagination]);


const Testimonials = () => {

  const [testimonials, setTestimonials] = useState([]);
  const [allCards, setAllCards] = useState("");

  useEffect(() => {
    const fetchData = async () => {

      // Initialize the AOS library
      AOS.init({
        duration: 2000,
      });

      const testimonialsCollection = collection(db, 'Testimonials');
      const testimonialsSnapshot = await getDocs(testimonialsCollection);

      const testimonialsData = testimonialsSnapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log('url:', docData.url);
        return {
          url: docData.url,
          quote: docData.quote,
          name: docData.name
        };
      });

      setTestimonials(testimonialsData);

      const allCards = testimonialsData.map((testimonial, index) => {
        return <TestimonialCards key={index} url={testimonial.url} quote={testimonial.quote} name={testimonial.name} />
      });

      setAllCards(allCards);
    };

    fetchData();
  }, []);

  return (

    <section id="testimonials" className="testimonials section-bg">
    <div className="container">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: true }} 
        pagination={{ clickable: true }}
        speed = {1000}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCards
              url={testimonial.url}
              quote={testimonial.quote}
              name={testimonial.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>

  );
};

export default Testimonials;
