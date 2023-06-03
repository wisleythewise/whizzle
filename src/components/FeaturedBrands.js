// FeaturedBrands.js
import React , { useState, useEffect, useContext }  from 'react';
import BrandCard from './BrandsCard';
import { collection, addDoc, getDocs,query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from './CTX/UserContext';


import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedBrands = () => {
  const [brand, setBrands] = useState([]);
  const [allCards, setAllCards] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([])
  const [email, setEmail] = useState('');
  const [submit, setSubmitted] = useState(false);
  const [presentt, setPresent] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext)

  // Fetch all the brand data that is available in the database
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

  // The user has selected these brand and there are set in the state using this funtion
  const selectedBrand = (name, set) => {
    if (set){
      setSelectedBrands(prevBrands => [...prevBrands, name]);
    } else {
      setSelectedBrands(prevBrands => prevBrands.filter(brand => brand !== name));
    }
  
  }

  // Generate a temporary password 
  const generateTempPassword = () => {
    const list_of_character = "qazwsxedcrfvtgbyhnujmik,ol.p;/[']1234567890";
    let password = "";
  
    for (let i = 0; i < 10; i++) {
      password += list_of_character.charAt(Math.floor(Math.random() * list_of_character.length));
    }
  
    return password;
  };

  // Create an account for the user
  const handleCreateAccount = async () => {
    const tempPassword = generateTempPassword();
    const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword)
    setCurrentUser(userCredential.user)
    return userCredential.user;
    }


  // Create the user in the firestore database
  const addDocument = async () => {
    const user = await handleCreateAccount();
    console.log("This si the user")
    console.log(user)

    try {
      const usersCollection = collection(db, 'Users');
      const docRef = await addDoc(usersCollection, {
        id : user.uid,
        email: email,
        brands: selectedBrands,
      });
  
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  // Send an email to user



  const does_user_exist = async (email) => {
   
    // Query the database where 'email' field equals to the provided email
    const userCollection = collection(db, 'Users');    
    const q = query(userCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return true
    } else {
      return false;
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your form submission logic goes here
    console.log('Email:', email);
    console.log('Selected brands:', selectedBrands);

    // Check if the user is already present in the database
    let user_already_exits = await does_user_exist(email)

    if (user_already_exits){
      console.log("The user already exits")
      setPresent(true)
      setSubmitted(true)
    }else{
      addDocument()
      setSubmitted(true)
    }

  };

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

  const sumbitted = ( ) => {
    const not_a_user = (     
     <div>
      <p>Thank you for submitting</p>
     </div>
     )

     const a_user = (
      <div>
      <p>You already have an account with us. Please check out your preferences</p>
     </div>

     )
    return presentt ?  a_user : not_a_user
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