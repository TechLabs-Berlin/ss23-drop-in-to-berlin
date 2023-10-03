


import React, { useState, useEffect } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import UserReview from '../UserReview/UserReview';
import axios from 'axios';


function ReviewList({ reviews, _id, onReviewAdded }) {
  const [amountRenderedReviews, setAmountRenderedReviews] = useState(2);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [renderedReviewCards, setRenderedReviewCards] = useState([]);


   
  const renderReviews = () => {
    if (!reviews) return null

      const slicedReviews = reviews.slice(0, amountRenderedReviews);
      return (
        slicedReviews.map((review, index) => (
          <ReviewCard review={review} onReviewAdded={onReviewAdded} key={index} _id={_id} setRenderedReviewCards={setRenderedReviewCards} renderedReviewCards={renderedReviewCards}></ReviewCard>
        ))
      )
  }


  const handleShowMoreReviews = () => {
    setAmountRenderedReviews(amountRenderedReviews === 2 ? reviews.length : 2);
  };

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className='reviews-section'>
      <div className='rendered-reviews'>
        {renderReviews()}
      </div>
      <button onClick={handleShowMoreReviews}>
        {amountRenderedReviews === 2 ? 'Show more Reviews' : 'Show less reviews'}
      </button>
      <UserReview _id={_id} isReviewSubmitted={isReviewSubmitted} setIsReviewSubmitted={setIsReviewSubmitted} onReviewAdded={onReviewAdded} />
    </div>
  );
}

export default ReviewList;
