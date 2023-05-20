import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/api';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';



function CurrentlySelectedBrands({userData, userId}) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const brandsCollection = collection(db, 'Brands');
      const brandsSnapshot = await getDocs(brandsCollection);
      
      const myArray = [];

      const brandsData = brandsSnapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log('url:', docData.name);
        return docData.name ;
      });
      console.log("lksajdfglvskdjf gsdjflgk;sdj")
      console.log(userData)
      setSelectedBrands(userData.brands)
      setBrands(brandsData);
      console.log("THese are all the brands")
      console.log(brandsData)

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
    const userDoc = doc(db, 'Users', userId); 

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

  return userData.brands ? (
    <div>
      <h1>Currently Selected Brands</h1>
      {checkboxes}
      <button onClick = {() => update()}>Update</button>
    </div>
  ) : <p>Loading...</p>;
}

export default CurrentlySelectedBrands;
