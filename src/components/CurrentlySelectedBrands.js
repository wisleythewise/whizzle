import React, { useEffect, useState, useContext } from 'react';
import { getUserData } from '../services/api';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from './CTX/UserContext';



function CurrentlySelectedBrands() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([])
  const {currentUser , setCurrentUser } = useContext(UserContext)

  const [docid, setDocId] = useState('')

  useEffect(() => {
    
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
        return docData.name ;
      });
      // Fetch the data of the brands of ther user
      const userBrands = await brandsOfUser()

      setSelectedBrands(userBrands)
      setBrands(brandsData);
      console.log("These are the selected brands")
      console.log(userBrands)
  }
  fetchData()

},[])


  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, event.target.value]);
    } else {
      setSelectedBrands(selectedBrands.filter(brand => brand !== event.target.value));
    }
  }

  const update = async () => {

    console.log("this is the docid", docid)
    const userDoc = doc(db, 'Users', docid); 
    

    await updateDoc(userDoc, {
      brands: selectedBrands, 
    });
  
  }
  
  const checkboxes = brands.map((brand, index) => {
    return (
      <div className="checkbox" key={index}> 
        <input 
          type="checkbox" 
          id={index} 
          name={brand} 
          value={brand} 
          checked={selectedBrands.includes(brand)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={index}>{brand}</label>
      </div>
    )
  })

  return selectedBrands ? (
    <div>
      <h1>Currently Selected Brands</h1>
      {checkboxes}
      <button onClick = {() => update()}>Update</button>
    </div>
  ) : <p>Loading...</p>;
}

export default CurrentlySelectedBrands;
