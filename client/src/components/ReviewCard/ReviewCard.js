import './ReviewCard.css';
import Button from '../Button/Button';
import ReviewStarRating from '../StarRating/ReviewStarRating';
import axios from 'axios';
import { useState } from 'react';

function ReviewCard({review, _id, renderedReviewCards, setRenderedReviewCards}) {
  const [fullReviewView, setFullReviewView] = useState(false);

  let text = review.text;

  if (!fullReviewView) {
    if (text.length > 100) {
      const shortName = text.substring(0, 100);
      text = `${shortName}...`;
    }
  }

  const openCloseFullReview = () => {
    setFullReviewView(!fullReviewView);
  };



  const handleReviewDelete = async () => {
    try {
      console.log(`The restaurant ID is: ${_id}, the review ID is: ${review._id}`);
      const response = await axios.delete(`http://localhost:3001/api/restaurants/${_id}/review/${review._id}`, review);
  
      // Update the state to remove the deleted review
      setRenderedReviewCards((prevReviewCards) =>
        prevReviewCards.filter((card) => card.props.review._id !== review._id)
      );
    } catch (error) {
      console.error('Error deleting review:', error);
    }}


  return (
    <div className='review'>
      <div>
        <div className='review-info'>
          <div className='review-author'>
            <img src={review.profile_photo_url} className='review-avatar' />
            <h3>{review.author_name}</h3>
          </div>
          <ReviewStarRating rating={review.rating} />
        </div>
        <p className='review-text'>{text}</p>
      </div>
      {/* the following button only appears, if textlength > x and opens, or cloes the full review */}
      <div className='btn-show-more'>
        {text.length > 100 ? (
          <button className='btn-full-review' onClick={openCloseFullReview}>
            {' '}
            {fullReviewView ? 'Show less' : 'show more'}
          </button>
        ) : null}
      </div>
      {/* the following button only appears, if the review was created by the user */}
      <div className = 'btn-delete-review'>
        {review.added_review ? <Button onClick={handleReviewDelete}>Delete Review</Button> : null}
      </div>
    </div>
  );
}

export default ReviewCard;
