// FeaturedBrands.js
import React , { useState, useEffect }  from 'react';


const BrandsCard = (props) => {
  const url = props.url
  const name = props.name
  const callback = props.callBack
  const [selected, setSelected] = useState(true)

  const handleClick = (name) =>{
    setSelected(!selected)
    callback(name, selected)
  }

  return (
  <div className="brand-container" onClick = { () => {handleClick(name)} }>
      <img className="brand-logo" src={url} alt="Brand 1" data-brand="Brand 1"></img>
    <div className="brand-overlay"></div>
  </div>
  );
};

export default BrandsCard;