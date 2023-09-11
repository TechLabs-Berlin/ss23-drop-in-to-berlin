import React, { useEffect, useState } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import './StarRating.css';

const StarRating = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);

  const handleMouseEnter = (hoveredStar) => {
      setSelectedRating(hoveredStar);
      console.log('hovered rating is:',{selectedRating})
    
  };

  const handleMouseLeave = () => {
    setSelectedRating(0);
  };

  const handleStarClick = (clickedRating) => {
      setClickedRating(clickedRating);
      console.log('clicked rating is:',{clickedRating})
  };

  // ! Why is interaction still possible after click? the cleanup function should delete the event listeners, once clickedRating changes

  useEffect(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => handleMouseEnter(index + 1));
      star.addEventListener('mouseleave', handleMouseLeave);
      star.addEventListener('click', () => handleStarClick(index + 1));

      return () => {
        star.removeEventListener('mouseenter', () => handleMouseEnter(index + 1));
        star.removeEventListener('mouseleave', handleMouseLeave);
        star.removeEventListener('click', () => handleStarClick(index + 1));
      };
    });
  }, [clickedRating]); // No dependencies here, add event listeners once

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        clickedRating >= index ? <IoStar key={index} className={`star ${clickedRating >= index || selectedRating >= index ? 'filled' : ''}`}  /> :
        <IoStarOutline
          key={index}
          className={`star ${clickedRating >= index || selectedRating >= index ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
