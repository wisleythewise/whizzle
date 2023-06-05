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
            <ul id="featuredbrands-flters">
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
      <div className="submitted-container">
      <div className="welcome-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2 className="welcome-title">Submission Successful!</h2>
      <p className="submitted-text">
        Thank you for submitting your information! Welcome to our community. You are now part of an exciting journey. Find out more in your personal dashboard.
      </p>
      <a className="dashboard-button" href="/dashboard">
                Go to Dashboard
      </a>
    </div>
     )
  }



  return (
  <section id="featuredbrands" className="featuredbrands">
    <div className="container">

      <div className="section-title" data-aos="fade-up">
        <h2><span>Select your favourite brands!</span></h2>
        <p>Get notified for free whenever your favourite brand is having a sale!</p>
      </div>



      {submit ? sumbitted(): emailForm() }
      </div>
  </section>

  );
};

export default FeaturedBrands;