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
    <div
      onClick={() => {
        handleClick(name);
      }}
      className='col-lg-4 col-md-6 portfolio-item filter-app'
    >
      <div className={`portfolio-wrap ${selected ? 'selected' : '' }` }>
        <img src={url} className="img-fluid" alt={url} />
        <div className="portfolio-info">
          <h4>{name}</h4>
          <div className="portfolio-links"></div>
        </div>
      </div>
    </div>
  );
};

export default BrandsCard;