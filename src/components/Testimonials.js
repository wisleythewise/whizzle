import React, { useState, useEffect } from 'react';
import TestimonialCards from "./TestimonialCards";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Testimonials = () => {

  const [testimonials, setTestimonials] = useState([]);
  const [allCards, setAllCards] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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
    <section className="testimonials">
      <h2 className="section-header">Trusted by Thousands</h2>
      <div className="testimonial-slider">
        {allCards}
      </div>
    </section>
  );
};

export default Testimonials;
