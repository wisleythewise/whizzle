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



function CurrentlySelectedBrands() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState([])
  const {currentUser , setCurrentUser } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false);
  const [docid, setDocId] = useState('')

  const [selectedBrandsDisplay, setSelectedBrandsDisplay ]= useState("")

  useEffect(() => {
    loadData()
  }, [currentUser])


// Making sure I have the latest value of the selected brands
useEffect(() => {
    // Filter the selected brands
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

}, [brands,selectedBrands]);


const loadData = () => {
  const brandsOfUser = async () => {
      
    const userCollection = collection(db, "Users")
    const userSnapshot = await  getDocs(userCollection)

    const preferredBrands = userSnapshot.docs.find((doc) => {
      const data = doc.data();
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
      setLoading(false); // This will only be called if no errors occurred
    } catch (error) {
      console.error('An error occurred:', error);
      // Optionally, you can set loading to false here too if you want to display an error message or something else when an error occurs
      setLoading(false);
    } 

}
fetchData()

}

  const handleModal = () => {
    setShowModal(!showModal);
  };


  const update = async () => {

    console.log("this is the docid", docid)
    const userDoc = doc(db, 'Users', docid); 
    

    await updateDoc(userDoc, {
      brands: selectedBrands, 
    });

    handleModal(); 
  
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





  const containerWithSelectedBrands = () => {
    return (
      <>
        <div style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: "8px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ textAlign: "left", fontSize: "15px", margin: '0' }}>Currently Selected Brands</h1>
            <button onClick={handleModal} style={{ backgroundColor: 'green', color: 'white', borderRadius: '3px', border: 'none', padding: '10px 20px', fontSize: '15px' }}>Edit</button>
          </div>
          <div style={{ borderBottom: '1px solid #000', margin: '10px 0' }}></div>
          <div className="row" style={{ paddingBottom: '30px' }}>
            {selectedBrandsDisplay}
          </div>
        </div>
        <Modal show={showModal} onHide={handleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Brands</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '400px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="row" style={{ paddingBottom: '30px' }}>
                {brands.map((brand, index) => {
                  return (
                    <div className="col-2" key={index}>
                      <BrandCard key={index} url={brand.url} name={brand.name} callBack={selectedBrand} selected={selectedBrands.includes(brand.name)} />
                    </div>
                  )
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => update()} style={{ backgroundColor: 'green', color: 'white', borderRadius: '3px', border: 'none', padding: '10px 20px', fontSize: '15px' }}>update</button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
    

  const loadingContainer = () => {
    return  <p>Loading...</p>
  }
  

  return loading ? loadingContainer() : containerWithSelectedBrands();
}

export default CurrentlySelectedBrands;
