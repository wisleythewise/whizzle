import React, { useState } from 'react';

const BrandsCard = (props) => {
  const url = props.url;
  const name = props.name;
  const callback = props.callBack;


  return (

      <div  className="brand-container" >
              <img src={url} className="brand-logo" alt={url}></img>
              <div className="brand-overlay"></div>   
      </div>



  );
};

export default BrandsCard;
