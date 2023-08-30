import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import './Filter.css';

function Filter() {
  const [priceFilter, setPriceFilter] = useState('Price');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

const handlePriceSelection = (value) => {
    setPriceFilter(value);
    setShowPriceDropdown(false);
};

const handleRatingSelection = (value) => {
    setRatingFilter(value);
    setShowRatingDropdown(false);
};

const renderStars = (num) => {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<IoStar key={i} />);
    }
    return <div className="star-wrapper">{stars}</div>;
};

return (
    <div className="filter-container">
      <div className="dropdown">
        <button onClick={() => setShowPriceDropdown(!showPriceDropdown)} className="dropdown-button">
          {priceFilter} <span className="arrow">▼</span>
        </button>
        <div className="dropdown-content" style={{ display: showPriceDropdown ? 'block' : 'none' }}>
          <button onClick={() => handlePriceSelection('Affordable')}>Affordable</button>
          <button onClick={() => handlePriceSelection('Medium')}>Medium</button>
          <button onClick={() => handlePriceSelection('High')}>High</button>
        </div>
      </div>
      <div className="dropdown">
      <button onClick={() => setShowRatingDropdown(!showRatingDropdown)} className="dropdown-button">
        {ratingFilter ? renderStars(ratingFilter) : <>Rating <span className="iconSpacing"><IoStar /></span></>}
      </button>
      <div className="dropdown-content" style={{ display: showRatingDropdown ? 'block' : 'none' }}>
        <div className="star-row"><button onClick={() => handleRatingSelection(1)}>{renderStars(1)}</button></div>
        <div className="star-row"><button onClick={() => handleRatingSelection(2)}>{renderStars(2)}</button></div>
        <div className="star-row"><button onClick={() => handleRatingSelection(3)}>{renderStars(3)}</button></div>
        <div className="star-row"><button onClick={() => handleRatingSelection(4)}>{renderStars(4)}</button></div>
        <div className="star-row"><button onClick={() => handleRatingSelection(5)}>{renderStars(5)}</button></div>
      </div>
    </div>
  </div>
);
}

export default Filter;