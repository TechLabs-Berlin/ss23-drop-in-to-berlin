/* eslint-disable jsx-a11y/img-redundant-alt */
import "./RestaurantCard.css";
import { IoStar, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

function RestCard({ rest }) {
    const imageUrl = rest.photos && rest.photos.length > 0 && rest.photos[0].imageURL;

    // shorten names longer than 25 characters
    let name = rest.name;
    if (name.length > 25) {
        const shortName = name.substring(0, 25);
        name = `${shortName}...`;
    }

    let reviewText = rest.reviews && rest.reviews.length > 0 ? rest.reviews[0].text : "";
    const MAX_REVIEW_LENGTH = 100;
    const isReviewTooLong = reviewText.length > MAX_REVIEW_LENGTH;

    const [showFullReview, setShowFullReview] = useState(false);

    if (!showFullReview && isReviewTooLong) {
        reviewText = `${reviewText.substring(0, MAX_REVIEW_LENGTH)}...`;
    }

    const priceRange = rest.price_level 
        ? '$'.repeat(rest.price_level) 
        : null;

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