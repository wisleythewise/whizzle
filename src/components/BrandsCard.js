import React, { useState } from 'react';

const BrandsCard = (props) => {
  const url = props.url;
  const name = props.name;
  const callback = props.callBack;
  const [selected, setSelected] = useState(false);

  const handleClick = (name) => {
    setSelected((prevSelected) => {
      const updatedSelected = !prevSelected;
      callback(name, updatedSelected);
      return updatedSelected;
    });
  };


  return (

      <div onClick={() => {
        handleClick(name);
      }} className={`brand-container ${selected ? 'selected' : '' }` }>
              <img src={url} className="brand-logo" alt={url}></img>
              <div className="brand-overlay"></div>  
            
      </div>



  );
};

export default BrandsCard;