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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      // Initialize the AOS library
      AOS.init({
        duration: 2000,
      });

      // const testimonialsCollection = collection(db, 'Testimonials');
      // const testimonialsSnapshot = await getDocs(testimonialsCollection);

      // const testimonialsData = testimonialsSnapshot.docs.map((doc) => {
      //   const docData = doc.data();
      //   console.log('url:', docData.url);
      //   return {
      //     url: docData.url,
      //     name: docData.name,
      //     quote: docData.quote
      //   };
      // });

      const testimonialsData = [
        { 
          name : "Mark, V.", 
          quote : "Ik heb sinds ik Whizzle gebruik nooit meer de volle prijs betaald. Echt ideaal." ,
        },
        { 
          name : "Pieter, H.", 
          quote : "Ik wil alleen weten wanneer bepaalde merken in de sale zijn, en Whizzle biedt precies dat." ,
        },
        { 
          name : "Vera, S.", 
          quote : "Ik vind Whizzle echt geweldig. Nooit meer zelf op zoek naar sales!"
           ,
        }
      ]

      setTestimonials(testimonialsData);

      const allCards = testimonialsData.map((testimonial, index) => {
        return <TestimonialCards key={index} quote={testimonial.quote} name={testimonial.name} />
      });

      setAllCards(allCards);

      setLoading(false); // Add this line
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-div">
        <div className="spinner"></div>
      </div>
    ); 
  }


  return (
    <section id="testimonials" className="testimonials sectionpadding section-bg">

    <div className="container" data-aos="fade-up">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: true }} 
          pagination={{ clickable: true }}
          speed = {1000}
          loop={true}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCards
                url={testimonial.url}
                name={testimonial.name}
                quote={testimonial.quote}
              />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  </section>
  );
};

export default Testimonials;
