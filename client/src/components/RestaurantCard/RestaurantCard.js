/* eslint-disable jsx-a11y/img-redundant-alt */
import './RestaurantCard.css';
import { IoStar } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// helper function to shorten text
function shortenText(text, maxLength) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}

function RestCard({ rest }) {
  const imageUrl =
    rest.photos && rest.photos.length > 0 && rest.photos[0].imageURL;

  // helper function to shorten the restaurant name
  const name = shortenText(rest.name, 13);

  let reviewText =
    rest.reviews && rest.reviews.length > 0 ? rest.reviews[0].text : '';
 
  const [showFullReview, setShowFullReview] = useState(false);

  const isReviewTooLong = reviewText.length > 100;

  if (!showFullReview && isReviewTooLong) {
    reviewText = shortenText(reviewText, 110);
  }

  const priceRange = rest.price_level ? '$'.repeat(rest.price_level) : null;

  const addressParts = rest.formatted_address?.split(', ');
  const postalCode = addressParts.length >= 3 ? addressParts[addressParts.length - 2].replace('Berlin', '') : '';

  return (
    <Link to={`/rest/${rest._id}`}>
      <div className='card'>
        <div className='rest-card-tooltip'>{rest.name}</div>
        {imageUrl && (
          <img src={imageUrl} alt='Restaurant Image' className='card-img' />
        )}
        <div className='card-content'>
          <div className='card-header'>
            <h2 className='card-name'>{name}</h2>
            <div className='card-rating'>
              {priceRange && <span className='card-price'>{priceRange}</span>}
              <IoStar className='iostar' />
              {rest.rating}
            </div>
          </div>
          {/* {postalCode && 
            <div className='card-postal-code'>
              <FaMapMarkerAlt className='pin-icon'/> 
              {postalCode}
            </div>
          } */}
          <p className='card-descr'>{reviewText}</p>
        </div>
      </div>
    </Link>
  );
}

export default RestCard;