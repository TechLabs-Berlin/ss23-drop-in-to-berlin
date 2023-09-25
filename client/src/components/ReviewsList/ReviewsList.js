import './ReviewsList.css';
import { useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import UserReview from '../UserReview/UserReview';

function ReviewList({ reviews, reference }) {

  const [amountRenderedReviews, setAmountRenderedReviews] = useState(2)
  
  const handleShowMoreReviews = () => {
    amountRenderedReviews != 2 ? setAmountRenderedReviews(2) : setAmountRenderedReviews(reviews.length)
  }

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }


  const renderedReviews = reviews
    .slice(0, amountRenderedReviews)
    .map((review, index) => (
      <ReviewCard review={review} key={index}></ReviewCard>
    ));
  console.log('review list before return');
  return (
    <div className='reviews-section'>
      <div className='rendered-reviews'>{renderedReviews}</div>
      <button onClick={handleShowMoreReviews}>{amountRenderedReviews === 2 ? 'Show more Reviews' : 'Show less reviews'}</button>
      <UserReview reference={reference}/>
    </div>
  );
}

export default ReviewList;
