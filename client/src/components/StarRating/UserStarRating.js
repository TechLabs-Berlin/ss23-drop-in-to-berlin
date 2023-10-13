import React, { useEffect, useState } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import './UserStarRating.css';

const StarRating = ({setUserRating}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);

  const handleMouseEnter = (hoveredStar) => {
      setHoveredRating(hoveredStar);
      console.log('hovered rating is:',{hoveredRating})
    
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (clickedRating) => {
      setClickedRating(clickedRating);
      setUserRating(clickedRating)
      console.log('clicked rating is:',{clickedRating})
  };

  useEffect(() => {
    const stars = document.querySelectorAll('.ur-star');
    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => handleMouseEnter(index + 1));
      star.addEventListener('mouseleave', handleMouseLeave);
      star.addEventListener('click', () => handleStarClick(index + 1));

    });
  }, [clickedRating]);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        clickedRating >= index ? <IoStar 
        key={index} 
        className={`ur-star ${clickedRating >= index || hoveredRating >= index ? 'filled' : ''}`}
          /> :
        <IoStarOutline
          key={index}
          className={`ur-star ${clickedRating >= index || hoveredRating >= index ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

export default StarRating;



/* import React, { useEffect, useState } from 'react';
import { IoStar } from 'react-icons/io5';
import './StarRating.css';

const StarRating = () => {
  const [clickedRating, setClickedRating] = useState(0); // holds true value of rating
  const [hoveredRating, sethoveredRating] = useState(0);

  console.log('the rating component is rendered')

  const handleMouseEnter = (hoveredStar) => {
    if (clickedRating > 0) return;
    sethoveredRating(hoveredStar);
    console.log('hovered rating is:', { hoveredRating });
  };

  const handleMouseLeave = () => {
    if (clickedRating > 0) return;
    sethoveredRating(0);
  };

  const handleStarClick = (rating) => {
    console.log('clicked rating is:', rating);
    
    if (clickedRating > 0) {
      console.log('There is already a rating and it is:', clickedRating);
      
      return;
    }

    setClickedRating(rating);
    console.log('This is first time recording a value and it is:', clickedRating);
  };


  return (
    <div className='star-rating'>
      {[1, 2, 3, 4, 5].map((index) => (
        <IoStar
          key={index}
          onClick={() => handleStarClick(index)}
          className={`star ${
            clickedRating >= index || hoveredRating >= index ? 'filled' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
 */