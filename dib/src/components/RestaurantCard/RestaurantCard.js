/* eslint-disable jsx-a11y/img-redundant-alt */
import "./RestaurantCard.css";
import { IoStar, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

// helper function to shorten text
function shortenText(text, maxLength) {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
}

function RestCard({ rest }) {
  const imageUrl = rest.photos && rest.photos.length > 0 && rest.photos[0].imageURL;

  // helper function to shorten the restaurant name
  const name = shortenText(rest.name, 25);

  let reviewText = rest.reviews && rest.reviews.length > 0 ? rest.reviews[0].text : "";
  const [showFullReview, setShowFullReview] = useState(false);
  const isReviewTooLong = reviewText.length > 100;
  
  if (!showFullReview && isReviewTooLong) {
    reviewText = shortenText(reviewText, 100);
  }

  const priceRange = rest.price_level ? '$'.repeat(rest.price_level) : null;

  return (
    <Link to={`/rest/${rest.reference}`}>
      <div className="card">
        {imageUrl && <img src={imageUrl} alt="Restaurant Image" className="card-img" />}
        {rest.hidden === 'Yes' ? <IoEyeOff size="2rem" color="white" className="card-hidden-ico" /> : null}
        <div className="card-content">
          <div className="card-header">
            <h2 className="card-name">{name}</h2>
            <div className="card-rating">
              {priceRange && <span className="card-price">{priceRange}</span>}
              <IoStar />
              {rest.rating}
            </div>
          </div>
          <p className="card-descr">{reviewText}</p>
          {isReviewTooLong && (
            <div className='btn-show-more' onClick={() => setShowFullReview(!showFullReview)}>
              {showFullReview ? 'Show Less' : 'Show More'}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default RestCard;