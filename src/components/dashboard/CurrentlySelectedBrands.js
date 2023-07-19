import React, { useEffect, useState, useContext } from 'react';
import { getUserData } from '../../services/api';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import BrandCardMiniature from './BrandsCardMiniature';
import BrandCard from '../BrandsCard';
import { UserContext } from '../CTX/UserContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CircleLoad from '../lotties/CircleLoad';




function CurrentlySelectedBrands() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState([])
  const {currentUser , setCurrentUser } = useContext(UserContext)
  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [docid, setDocId] = useState('')
  const [selectedBrandsDisplay, setSelectedBrandsDisplay ]= useState("")
  const [isEditing, setIsEditing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
        // Filter by search keyword
        if (searchKeyword) {
          const filteredBrandsData = brands.filter((brand) => {
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

        setFilteredBrands(filteredBrandsData);
        }else {
          setFilteredBrands(brands);
        }


  }, [searchKeyword, brands])

  useEffect(() => {
    loadData()
  }, [currentUser])


// Making sure I have the latest value of the selected brands
useEffect(() => {
    // Filter the selected brands
    if (initialized){
      const brandsOfUser = brands.filter(brand => selectedBrands.includes(brand.name)).map((brand, brandIndex) => {
        return (
        <div className="col-2" key={brandIndex}>
          <BrandCardMiniature
            url={brand.url}
            name={brand.name}
            callBack={empty}      
          />
        </div>
      )})

      setSelectedBrandsDisplay(brandsOfUser)
    }


    

}, [brands,selectedBrands, initialized]);


const loadData = async () => {
  const brandsOfUser = async () => {
      
    const userCollection = collection(db, "Users")
    const userSnapshot = await  getDocs(userCollection)
    
    console.log(userSnapshot)

    const preferredBrands = userSnapshot.docs.find((doc) => {
      const data = doc.data();
      
      // if no user is login in navigate back to the home page
      if (!currentUser){
        navigate("/login")
      }

      return data.id == currentUser.uid
      })

    if (preferredBrands){
      setDocId(preferredBrands.id)
      return preferredBrands.data().brands;
    } else {
      console.error('No user found with id:', currentUser.uid);
      return null;
    }

  }


  const fetchData = async () => {
    const brandsCollection = collection(db, 'Brands');
    const brandsSnapshot = await getDocs(brandsCollection);
    
    const myArray = [];

    const brandsData = brandsSnapshot.docs.map((doc) => {
      const docData = doc.data();
      console.log('url:', docData.name);
      return {
        url: docData.url,
        name : docData.name,
        label : docData.label ? docData.label : "all" 
      };
    });
    // Fetch the data of the brands of ther user
    const userBrands = await brandsOfUser()

    try {
      // Your existing code...

      setSelectedBrands(userBrands)
      setBrands(brandsData);
      setFilteredBrands(brandsData);
      setLoading(false); // This will only be called if no errors occurred
    } catch (error) {
      console.error('An error occurred:', error);
      // Optionally, you can set loading to false here too if you want to display an error message or something else when an error occurs
      setLoading(false);
      setSelectedBrands("")
      setBrands("");
    } 

}
  await fetchData()
  setInitialized(true);

}



  const update = async () => {

    console.log("this is the docid", docid)
    const userDoc = doc(db, 'Users', docid); 
    

    await updateDoc(userDoc, {
      brands: selectedBrands, 
    });
  
  }

  // empty callback
  const empty = () => {
    return
  }

  // The user has selected these brand and there are set in the state using this funtion
    const selectedBrand = (name, set) => {
      if (set){
        setSelectedBrands(prevBrands => [...prevBrands, name]);
        console.log(selectedBrands)
      } else {
        setSelectedBrands(prevBrands => prevBrands.filter(brand => brand !== name));
      }
    
    }



    const handleEditToggle = () => {
      if (isEditing) {
        update();
      }
      setIsEditing(!isEditing);
    };


 
    const containerWithSelectedBrands = () => {
      return (
        <>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Currently Selected Brands</h1>
              <button onClick={handleEditToggle} className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}>
                {isEditing ? 'Save' : 'Edit'}
              </button>

            </div>
            <hr />
    
            {/* Conditionally render the brand logos when not in edit mode */}
            {!isEditing && <div className="row">{selectedBrandsDisplay}</div>}
    
            {/* Conditionally render the brand selection when in edit mode */}
            {isEditing && (
              <>
              <div className='brand-search-container'>
                <input type="text" name="brand-search" onChange= {(e) => setSearchKeyword(e.target.value)} className="brand-search form-control" id="brand-search" placeholder="Zoek naar je favoriete merken..." required=""></input>
              </div>
                <div className="brand-grid-dashboard">

                  {filteredBrands
                    .sort((a, b) => {
                      // Sort by whether the brand is selected
                      const aSelected = selectedBrands.includes(a.name);
                      const bSelected = selectedBrands.includes(b.name);
    
                      // If a is selected and b is not, put a first
                      if (aSelected && !bSelected) {
                        return -1;
                      }
                      // If b is selected and a is not, put b first
                      else if (!aSelected && bSelected) {
                        return 1;
                      }
                      // If both are selected or both are not selected, don't change their order
                      else {
                        return 0;
                      }
                    })
                    .map((brand, index) => {
                      return (
                        <div className="brand-card-dashboard" key={index}>
                          <BrandCard
                            key={index}
                            url={brand.url}
                            name={brand.name}
                            callBack={selectedBrand}
                            selected={selectedBrands.includes(brand.name)}
                          />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </>
      );
    };
    
    

    const loadingContainer = () => {
      return (
        <div className='loading-animation-container d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
        <CircleLoad />
        </div>
      );
    }
  

  return loading ? loadingContainer() : containerWithSelectedBrands();
}

export default CurrentlySelectedBrands;
