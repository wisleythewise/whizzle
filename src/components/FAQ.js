// CTASection.js
import React , { useEffect, useState }  from 'react';
import FAQCard from "./FAQCard"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

// 
// 
// TO DO: Als de user op mobile site bezoekt, dan moeten FAQ's uitklapbaar zijn netzoals how it works
// Als user op laptop zit dan al uitgeklapt weergeven
// 
const FAQ = (props) => {
  const [allCards, setAllCards] = useState([])

  useEffect( () => {

    const fetchData = async () => {
      const brandsCollection = collection(db, 'Faqs');
      const brandsSnapshot = await getDocs(brandsCollection);

      // const brandsData = brandsSnapshot.docs.map((doc) => {
      //   const docData = doc.data();
      //   console.log('url:', docData.name);
      //   return {
      //     title: docData.title,
      //     text : docData.text
      //   };
      // });

      const faqData = [
        {
          title : "Hoe werkt Whizzle?" , 
          text : "Nadat je je favoriete merken hebt geselecteerd, controleert Whizzle hun e-mailmarketing voor jou en informeert je wanneer ze online sales hebben.",
        },
        {
          title : "Hoe vaak ontvang ik e-mails van Whizzle? ", 
          text : "Dat bepaal jij helemaal zelf! Whizzle is bedoeld om hoofdpijn-vrij te zijn, dus jij bent de baas over de frequentie van onze e-mails.",
        },
        {
          title : "Kan ik aanpassen wanneer ik een melding van een sale ontvang?", 
          text : "Ja, je kunt kiezen hoe ver van te voren je een alert wilt krijgen over een sale. Dat kan 1 minuut van te voren, een uur van te voren, 24 uur van te voren of een combinatie hiervan. Jij bent de baas.",
        },                
        {
          title : "Hoe kan ik me afmelden voor de mailing?", 
          text : "Heel eenvoudig! Ga naar het gedeelte 'dashboard' en voer je e-mailadres in. Klik op 'uitschrijven' en je ontvangt geen e-mails meer.",
        }
      ]

      console.log("This is the brandsdata")
      console.log(faqData)

      setAllCards(faqData);

      const allCards = faqData.map((faqitem, index) => {
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
      <h2><span>Veelgestelde vragen</span></h2>
      </div>

      {allCards}

    </div>
  </section>
  
  );
};

export default FAQ;