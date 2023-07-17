import React, { useState } from 'react';
import TapAnimation from './Lotties';

const BrandsCard = (props) => {
  const url = props.url;
  const name = props.name;
  const callback = props.callBack;
  const selected = props.selected;
  const onClick = props.onClick; 

  const handleClick = (name) => {
      callback(name, !selected);
      onClick && onClick();
  };


  return (

      <div onClick={() => {
        handleClick(name);
      }} className={`brand-container ${selected ? 'selected' : '' }` }>
              <div className='img-div'>
                <img src={url} className="brand-logo" alt={url}></img>
                
              </div>
              {/* <TapAnimation /> */}
              <div className="brand-overlay"><div className='brand-overlay-icon'><i class="bi bi-check-all"></i></div></div>  
            
      </div>



  );
};

export default BrandsCard;