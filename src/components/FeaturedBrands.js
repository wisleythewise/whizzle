// FeaturedBrands.js
import React , { useState, useEffect, useContext }  from 'react';
import BrandCard from './BrandsCard';
import { collection, addDoc, getDocs,query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from './CTX/UserContext';

// Pagination 
import ReactPaginate from 'react-paginate';

// Mobile pagination
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';


// Effects
import AOS from 'aos';
import 'aos/dist/aos.css';

SwiperCore.use([Autoplay, Pagination]);

const FeaturedBrands = () => {
  const [allCards, setAllCards] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([])
  const [email, setEmail] = useState('');
  const [submit, setSubmitted] = useState(false);
  const [presentt, setPresent] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [loading, setLoading] = useState(true); 

  // All brands
  const [brand, setBrands] = useState([]);

  // Search bar filter
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // Label filter
  const [filter, SetFilter] = useState("All")
  const [filteredBrands, SetFilteredBrands] = useState([])

  // For pagination
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 761px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });
  
  let itemsPerPage = 3; // Default value
  if (isMobile) {
    itemsPerPage = 9; // 9 items on mobile
  } else if (isTablet) {
    itemsPerPage = 12; // 12 items on tablet
  } else if (isDesktop) {
    itemsPerPage = 15; // 15 items on desktop
  }

  const [swipeEffect, setSwipeEffect] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentPage(currentPage + 1);
      setSwipeEffect(true);
    },
    onSwipedRight: () => {
      setCurrentPage(currentPage - 1);
      setSwipeEffect(true);
    },
  });


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
  }, [filteredBrands, currentPage,selectedBrands, itemsPerPage]);

  // Call handle filter after the state has been changed
      useEffect(() => {
        let filteredBrandsData = brand;
  
        // Filter by category
        if (filter === "Men") {
          filteredBrandsData = filteredBrandsData.filter((brand) => brand.label === "Men");
        } else if (filter === "Woman") {
          filteredBrandsData = filteredBrandsData.filter((brand) => brand.label === "Woman");
        } else if (filter === "Kids") {
          filteredBrandsData = filteredBrandsData.filter((brand) => brand.label === "Kids");
        }
      
        // Filter by search keyword
        if (searchKeyword) {
          filteredBrandsData = filteredBrandsData.filter((brand) => {
              console.log("This is the brands data")          
              console.log(brand.name);
              // check if brand.name is not undefined or null
              if (brand.name) {
                  return brand.name.toLowerCase().startsWith(searchKeyword.toLowerCase());
              } else {
                  console.log('Error: brand.name is undefined or null');
                  return false;
              }
          });
        }
      
        SetFilteredBrands(filteredBrandsData);
      }, [searchKeyword, filter, brand]);
        
  
    
  



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



    // Function to chunk an array
    const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );


  const emailForm = () => {

    const chunkedBrands = chunk(filteredBrands, 9);
    return (      

    <div>

        <div id="brand-search-container" className="brand-search-container form-group" data-aos="fade-up">
          <input type="text" name="brand-search" onChange= {(e) => setSearchKeyword(e.target.value)} className="brand-search form-control" id="brand-search" placeholder="Zoek naar je favoriete merken..." required=""></input>
      </div>
      
      <div className="row" data-aos="fade-up">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="featuredbrands-flters">
            <li data-filter="*" className={filter === "All" ? "filter-active" : ""}  onClick={() => {SetFilter("All")}}>All</li>
            <li data-filter=".filter-app" className={filter === "Men" ? "filter-active" : ""}  onClick={() => {SetFilter("Men")}}>Men</li>
            <li data-filter=".filter-app" className={filter === "Woman" ? "filter-active" : ""}  onClick={() => {SetFilter("Woman")}}>Woman</li>
            <li data-filter=".filter-app" className={filter === "Kids" ? "filter-active" : ""}  onClick={() => {SetFilter("Kids")}}>Kids</li>
            </ul>
          </div>
        </div>

        
        
        {isMobile ? (
          <Swiper
          className='swiper-container'
      slidesPerView={1}
      spaceBetween={50}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide changed')}
      onSwiper={(swiper) => console.log(swiper)}
      data-aos="fade-up"
    >
      {chunkedBrands.map((chunk, index) => (
        <SwiperSlide key={index}>
          <div className="brand-grid" style = {{paddingbottom : "50px"}}>
            {chunk.map((brand, brandIndex) => (
              <div className="brand-container" key={brandIndex}>
                <BrandCard
                  url={brand.url}
                  name={brand.name}
                  callBack={selectedBrand}
                  selected={selectedBrands.includes(brand.name)}
                />
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  ) : (
        <div  data-aos="fade-up">
          <div className="brand-grid mx-auto">
            {allCards}
          </div>
  
          <ReactPaginate
            previousLabel={<i class="bi bi-caret-left-fill"></i>}
            nextLabel={<i class="bi bi-caret-right"></i>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(brand.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              handlePageClick(data.selected);
              setCurrentPage(data.selected);
            }}
            forcePage={currentPage}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      )}
    

      <div className="email-container form-group" data-aos="fade-up">
        <form className="email-form" method="POST"  onSubmit={handleSubmit}>
          <input type="email" className="form-control email-input" name="email" required placeholder="Email Adress" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
          <button type="submit" className="btn btn-outline-primary">Abboneer!</button>
        </form>
      </div>
    </div>
    )
  }

  const submitted = ( ) => {
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
      <p>Het lijkt erop dat je al een account hebt! Ga naar jouw persoonlijke dashboard om jouw favoriete merken aan te passen.</p>
      <a className="dashboard-button" href="/login">
                Ga naar Dashboard
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




      {submit ? submitted(): emailForm() }
      </div>
  </section>

  );
};

export default FeaturedBrands;