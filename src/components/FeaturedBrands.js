// FeaturedBrands.js
import React , { useState, useEffect }  from 'react';
import BrandCard from './BrandsCard';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedBrands = () => {

  const [brand, setBrands] = useState([]);
  const [allCards, setAllCards] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([])
  const [email, setEmail] = useState('');
  const [submit, setSubmitted] = useState(false);

  const selectedBrand = (name, set) => {
    if (set){
      setSelectedBrands(prevBrands => [...prevBrands, name]);
    } else {
      setSelectedBrands(prevBrands => prevBrands.filter(brand => brand !== name));
    }
  
  }

  const addDocument = async () => {
    try {
      const usersCollection = collection(db, 'Users');
      const docRef = await addDoc(usersCollection, {
        email: email,
        brands: selectedBrands,
      });
  
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic goes here
    console.log('Email:', email);
    console.log('Selected brands:', selectedBrands);
    addDocument()
    setSubmitted(true)
  };

  console.log("These are the selected brands")
  console.log(selectedBrands)

  useEffect(() => {
    AOS.init({
      duration : 2000 // duration of the animations in milliseconds
    });

    const fetchData = async () => {
      const brandsCollection = collection(db, 'Brands');
      const brandsSnapshot = await getDocs(brandsCollection);

      const brandsData = brandsSnapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log('url:', docData.name);
        return {
          url: docData.url,
          name : docData.name
        };
      });

      setBrands(brandsData);

      const allCards = brandsData.map((brand, index) => {
        return <BrandCard key={index}  url={brand.url} name = {brand.name} callBack = {selectedBrand} />
      });

      setAllCards(allCards);
    };

    fetchData();

  }, []);


  const emailForm = () => {
    return (      

    <div>

        <div id="brand-search-container" data-aos="fade-up" data-aos-delay="200" className="brand-search-container form-group">
          <input type="text" name="brand-search" className="brand-search form-control" id="brand-search" placeholder="Search for your favourite brands" required=""></input>
      </div>
      
      <div className="row" data-aos="fade-up" data-aos-delay="200">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" className="filter-active">All</li>
              <li data-filter=".filter-app">Men</li>
              <li data-filter=".filter-app">Woman</li>
              <li data-filter=".filter-app">Kids</li>
            </ul>
          </div>
        </div>
  

        <div class="brand-grid" data-aos="fade-up" data-aos-delay="400">

        {allCards}

      </div>

      <div className="email-container form-group" data-aos="fade-up" data-aos-delay="600">
        <form className="email-form" method="POST"  onSubmit={handleSubmit}>
          <input type="email" className="form-control email-input" name="email" required placeholder="Email Adress" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
          <button type="submit" className="btn btn-outline-primary">Subscribe!</button>
        </form>
      </div>
    </div>
    )
  }

  const sumbitted = () => {
    return (
     <div>
      <p>Thank you for submitting</p>
     </div>)
  }



  return (
  <section id="portfolio" className="portfolio">
    <div className="container">

      <div className="section-title" data-aos="fade-up">
        <h2>Select your favourite brands!</h2>
        <p>Get notified for free whenever your favourite brand is having a sale!</p>
      </div>

      {/* <div className="row" data-aos="fade-up" data-aos-delay="200">
        <div className="col-lg-12 d-flex justify-content-center">
          <ul id="portfolio-flters">
            <li data-filter="*" className="filter-active">All</li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-card">Card</li>
            <li data-filter=".filter-web">Web</li>
          </ul>
        </div>
      </div> */}


      {submit ? sumbitted(): emailForm() }
      </div>
  </section>

  );
};

export default FeaturedBrands;