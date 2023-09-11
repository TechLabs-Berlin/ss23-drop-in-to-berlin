import './ReviewCard.css';
import ReviewStarRating from '../StarRating/ReviewStarRating';
import { useState } from 'react';

function ReviewCard(review) {
  const [fullReviewView, setFullReviewView] = useState(false);

  const reviewNew = review.review;
  let text = reviewNew.text;

  if (!fullReviewView) {
    if (text.length > 100) {
      const shortName = text.substring(0, 100);
      text = `${shortName}...`;
    }
  }

  const openCloseFullReview = () => {
    setFullReviewView(!fullReviewView);
  };

  return (
    <div className='review'>
      <div>
        <div className='review-info'>
          <div className='review-author'>
            <img src={reviewNew.profile_photo_url} className='review-avatar' />
            <h3>{reviewNew.author_name}</h3>
          </div>
          <ReviewStarRating rating={reviewNew.rating} />
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
    </div>
  );
}

export default ReviewCard;
