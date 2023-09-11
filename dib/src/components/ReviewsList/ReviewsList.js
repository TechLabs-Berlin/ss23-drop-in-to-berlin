import './ReviewsList.css';
import { useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import UserReview from '../UserReview/UserReview';

function ReviewList({ reviews }) {
  

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  let amountRenderedReviews = 2
  // const [amountRenderedReviews, setAmountRenderedReviews] = useState(2)


  // const handleShowMoreReviews = () => {
  //   setAmountRenderedReviews((prevAmount) => {
  //     prevAmount === 2 ? 5 : 2 
  //   }) 
  // }

  const renderedReviews = reviews
    .slice(0, amountRenderedReviews)
    .map((review, index) => (
      <ReviewCard review={review} key={index}></ReviewCard>
    ));
  console.log('review list before return');
  return (
    <div className='reviews-section'>
      <div className='rendered-reviews'>{renderedReviews}</div>
      {/* <button onClick={handleShowMoreReviews}>{amountRenderedReviews === 2 ? 'Show more Reviews' : 'Show less reviews'}</button> */}
      <UserReview />
    </div>
  );
}

export default ReviewList;
