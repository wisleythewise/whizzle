// FeaturedBrands.js
import React , { useState, useEffect }  from 'react';
import BrandCard from './BrandsCard';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

const FeaturedBrands = () => {

  const [brand, setBrands] = useState([]);
  const [allCards, setAllCards] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([])
  const [email, setEmail] = useState('');

  const selectedBrand = (name, set) => {
    if (set){
      setSelectedBrands([...selectedBrands, name]);
    }else{
      setSelectedBrands(selectedBrands.filter(brand => brand !== name));
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
  };

  console.log("These are the selected brands")
  console.log(selectedBrands)

  useEffect(() => {
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



  return (
    <section className="featured-brands" id="brandsSection">
    <h2 className="featured-brands-header">Select your favourite brands</h2>

    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search for your favourite brand...." onfocus="this.placeholder = ''" onblur="if (this.value == '') { this.placeholder = 'Search for your favourite brand....'; }"></input>
    </div>


  <div className="brand-logos">
    {allCards}
  </div>
  
    <div className="email-container">
      <form className="email-form" method="POST"  onSubmit={handleSubmit}>

        <input type="email" className="email-input" name="email" required placeholder="Email Adress" value={email} onChange={(e) => setEmail(e.target.value)} ></input>

        <button type="submit" className="submit-button">Subscribe!</button>
      </form>
    </div>
  </section>

  );
};

export default FeaturedBrands;