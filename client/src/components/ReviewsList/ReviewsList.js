/* import './ReviewsList.css';
import { useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import UserReview from '../UserReview/UserReview';

function ReviewList({ reviews, _id }) {

  const [amountRenderedReviews, setAmountRenderedReviews] = useState(2)
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)
  //submission of user review in child component, has to rerender to list, to be displayed
  
  const handleShowMoreReviews = () => {
    amountRenderedReviews != 2 ? setAmountRenderedReviews(2) : setAmountRenderedReviews(reviews.length)
  }

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }


  const renderedReviews = reviews
    .slice(0, amountRenderedReviews)
    .map((review, index) => (
      <ReviewCard review={review} key={index} _id={_id}></ReviewCard>
    ));
  console.log('review list before return');
  return (
    <div className='reviews-section'>
      <div className='rendered-reviews'>{renderedReviews}</div>
      <button onClick={handleShowMoreReviews}>{amountRenderedReviews === 2 ? 'Show more Reviews' : 'Show less reviews'}</button>
      <UserReview _id={_id} isReviewSubmitted={isReviewSubmitted} setIsReviewSubmitted={setIsReviewSubmitted}/>
    </div>
  );
}

export default ReviewList;
 */



import React, { useState, useEffect } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import UserReview from '../UserReview/UserReview';
import axios from 'axios';

//! I want to take out the review prop and relate everything to the fetched data, not the data from the prop

function ReviewList({ reviews, _id }) {
  const [amountRenderedReviews, setAmountRenderedReviews] = useState(2);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [renderedReviewCards, setRenderedReviewCards] = useState([]);

  useEffect(() => {
   
  // const getReviews = async () => {
  //   const response = await axios.get(`http://localhost:3001/api/restaurants/${_id}/reviews`)
  //   setRenderedReviewCards(response)
  //   console.log('this is the reviewlist request response:', renderedReviewCards)
  // }

  // Check if reviews are available before processing them
    if (reviews && reviews.length > 0) {
      // Calculate the renderedReviewCards when reviews or amountRenderedReviews change
      const slicedReviews = reviews.slice(0, amountRenderedReviews);
      const renderedReviews = slicedReviews.map((review, index) => (
        <ReviewCard review={review} key={index} _id={_id} setRenderedReviewCards={setRenderedReviewCards} renderedReviewCards={renderedReviewCards}></ReviewCard>
      ));
      setRenderedReviewCards(renderedReviews);
    }
  }, [amountRenderedReviews]);

  const handleShowMoreReviews = () => {
    setAmountRenderedReviews(amountRenderedReviews === 2 ? reviews.length : 2);
  };

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className='reviews-section'>
      <div className='rendered-reviews'>{renderedReviewCards}</div>
      <button onClick={handleShowMoreReviews}>
        {amountRenderedReviews === 2 ? 'Show more Reviews' : 'Show less reviews'}
      </button>
      <UserReview _id={_id} isReviewSubmitted={isReviewSubmitted} setIsReviewSubmitted={setIsReviewSubmitted} />
    </div>
  );
}

export default ReviewList;
