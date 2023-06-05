// CTASection.js
import React , { useEffect, useState }  from 'react';
import FAQCard from "./FAQCard"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 


const FAQ = (props) => {
  const [allCards, setAllCards] = useState([])

  useEffect( () => {

    const fetchData = async () => {
      const brandsCollection = collection(db, 'Faqs');
      const brandsSnapshot = await getDocs(brandsCollection);

      const brandsData = brandsSnapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log('url:', docData.name);
        return {
          title: docData.title,
          text : docData.text
        };
      });

      setAllCards(brandsData);

      const allCards = brandsData.map((faqitem, index) => {
        return <FAQCard key={index} title = {faqitem.title} text = {faqitem.text} />
      });

      setAllCards(allCards);
    };

    fetchData();

  }, [])
  

  return (        
    <section id="faq" class="faq">
    <div class="container">

      <div class="section-title" data-aos="fade-up">
        <h2><span>Frequently Asked Questions</span></h2>
      </div>

      {allCards}

    </div>
  </section>
  
  );
};

export default FAQ;