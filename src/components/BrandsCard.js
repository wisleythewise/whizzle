import React, { useState } from 'react';

const BrandsCard = (props) => {
  const url = props.url;
  const name = props.name;
  const callback = props.callBack;
  const selected = props.selected;

  const handleClick = (name) => {
      callback(name, !selected);

  };


  return (

      <div onClick={() => {
        handleClick(name);
      }} className={`brand-container ${selected ? 'selected' : '' }` }>
              <div className='img-div'>
                <img src={url} className="brand-logo" alt={url}></img>
              </div>
              <div className="brand-overlay"></div>  
            
      </div>



  );
};

export default BrandsCard;