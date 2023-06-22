// FeaturedBrands.js
import React , { useState, useEffect, useContext }  from 'react';
import BrandCard from './BrandsCard';
import { collection, addDoc, getDocs,query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from './CTX/UserContext';
import ReactPaginate from 'react-paginate';


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
  const [loading, setLoading] = useState(true); // Add this line

  const [filter, SetFilter] = useState("All")
  const [filteredBrands, SetFilteredBrands] = useState([])


  // For pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Change this to change the number of items per page


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
          name : docData.name,
          label : docData.label ? docData.label : "all" 
        };
      });
  
      setBrands(brandsData);
      SetFilteredBrands(brandsData)
    };
  
    fetchData();
    setLoading(false); // Add this line
  
  }, []); // Removed 'brand' from the dependency array
  
  // Update the allCards state whenever currentPage changes
  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    const pageBrands = filteredBrands.slice(offset, offset + itemsPerPage);
  
    const allCards = pageBrands.map((brand, index) => {
      return <BrandCard key={index}  url={brand.url} name = {brand.name} callBack = {selectedBrand} selected={selectedBrands.includes(brand.name)} />
    });
  
    setAllCards(allCards);
  }, [filteredBrands, currentPage,selectedBrands]);

  // The user has selected these brand and there are set in the state using this funtion
  const selectedBrand = (name, set) => {
    if (set){
      setSelectedBrands(prevBrands => [...prevBrands, name]);
      console.log(selectedBrands)
    } else {
      setSelectedBrands(prevBrands => prevBrands.filter(brand => brand !== name));
    }
  
  }

  // handle loading
  if (loading) {
    return (
      <div className="loading-div">
        <div className="spinner"></div>
      </div>
    ); 
  }

  // Handle pagination clicks
  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);
  };

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
    return { user: userCredential.user, password: tempPassword };
    }


  // Create the user in the firestore database
  const addDocument = async () => {
    const {user, password} = await handleCreateAccount();
    console.log("This si the user")
    console.log(user)
    

    try {
      const usersCollection = collection(db, 'Users');
      const docRef = await addDoc(usersCollection, {
        id : user.uid,
        email: email,
        brands: selectedBrands,
      });

      try{
        const mailingCollection = collection(db, "mail");
        const docRefmail = await addDoc(mailingCollection , {
          to : email,
          message : {
            subject : "Welcome at Whizzle",
            text : `Thank you for signing up, use the following password to login ${password}`,
            html : ""

          }
        })

        console.log("Sending mail to", docRefmail.id)
      }catch (error){
        console.log("Something went wrong with sending the mail")
      }
  
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

  const handleFilter = (category) =>  {
    console.log("We are in handleFIlter")

    if (category == "All"){
      SetFilter("All")
      SetFilteredBrands(brand)
    } else if (category == "Men"){
      const filteredBrands = brand.filter((brand) => brand.label == "Men" );
      SetFilter("Men")
      SetFilteredBrands(filteredBrands)
    } else if (category == "Woman"){
      const filteredBrands = brand.filter((brand) => brand.label == "Woman" );
      SetFilter("Woman")
      SetFilteredBrands(filteredBrands)
    } else{
      const filteredBrands = brand.filter((brand) => brand.label == "Kids" );
      SetFilter("Kids")
      SetFilteredBrands(filteredBrands)
    } 

    
  }

  const emailForm = () => {
    return (      

    <div>

        <div id="brand-search-container" className="brand-search-container form-group">
          <input type="text" name="brand-search" className="brand-search form-control" id="brand-search" placeholder="Zoek naar je favoriete merken" required=""></input>
      </div>
      
      <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="featuredbrands-flters">
              <li data-filter="*" className={filter == "All" ? "filter-active" : ""}  onClick={() => {handleFilter("All")}}>All</li>
              <li data-filter=".filter-app" className={filter == "Men" ? "filter-active" : ""}  onClick={() => {handleFilter("Men")}}>Men</li>
              <li data-filter=".filter-app" className={filter == "Woman" ? "filter-active" : ""}  onClick={() => {handleFilter("Woman")}}>Woman</li>
              <li data-filter=".filter-app" className={filter == "Kids" ? "filter-active" : ""}  onClick={() => {handleFilter("Kids")}}>Kids</li>
            </ul>
          </div>
        </div>
  

        <div class="brand-grid">
        {allCards}
        </div>
        
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(brand.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
    

      <div className="email-container form-group" data-aos="fade-up" data-aos-delay="600">
        <form className="email-form" method="POST"  onSubmit={handleSubmit}>
          <input type="email" className="form-control email-input" name="email" required placeholder="Email Adress" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
          <button type="submit" className="btn btn-outline-primary">Abboneer!</button>
        </form>
      </div>
    </div>
    )
  }

  const sumbitted = ( ) => {
    const not_a_user = (     
      <div className="submitted-container">
      <div className="welcome-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2 className="welcome-title">Het aanmelden is gelukt!</h2>
      <p className="submitted-text">
        Bedankt voor het opgeven van jouw voorkeur, welkom bij Whizzle. Je maak nu deel uit van het spannede avontuur. Vind meer informatie in het gepersonaliseerde dashboard.
      </p>
     </div>
     )

     const a_user = (
      <div>
      <p>You already have an account with us. Please check out your preferences</p>
      <a className="dashboard-button" href="/dashboard">
                Go to Dashboard
      </a>
    </div>
     

     )
    return presentt ?  a_user : not_a_user
  }



  return (
  <section id="featuredbrands" className="featuredbrands">
    <div className="container">

      <div className="section-title" data-aos="fade-up">
        <h2><span>SELECTEER JE FAVORIETE MERKEN</span></h2>
        <p>Ontvang gratis meldingen wanneer je favoriete merk een uitverkoop heeft!</p>
      </div>




      {submit ? sumbitted(): emailForm() }
      </div>
  </section>

  );
};

export default FeaturedBrands;